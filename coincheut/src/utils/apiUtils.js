import { RSAA, getJSON, apiMiddleware } from 'redux-api-middleware';
import { polyfill } from 'es6-promise'; polyfill();
import queryString from 'query-string'
import { xml2js, js2xml } from 'xml-js'

import fetch from 'isomorphic-fetch';
import apStAg from "./apStAg";

export { apiMiddleware }


export { getJSON };

export const NAME_KEYS_PREFIX = "apiUtils|"
export const SUBMIT_KEYS_POSTFIX = "|SUBMIT"
export const SUCCESS_KEYS_POSTFIX = "|SUCCESS"
export const FAILED_KEYS_POSTFIX = "|FAILED"
export const CLEAN_KEYS_POSTFIX = "|CLEAN"

const BODY_SAML_REQUEST = "SAMLRequest"
const TIMEOUT_ERROR_MESSAGE = "Your session has timed out. Please refresh the application to login."

export const APIUTILS_REFRESH_MANUAL = 'MANUAL'
export const APIUTILS_REFRESH_AUTO = 'AUTO'
export const APIUTILS_REFRESH_CHECK = 'CHECK'

export const APIUTILS_GET_METHOD = 'GET'

export const APIUTILS_POST_METHOD = 'POST'

export const APIUTILS_PUT_METHOD = 'PUT'

export const APIUTILS_DELETE_METHOD = 'DELETE'

export const APIUTILS_API_NEW_STATE = "NEW"

export const APIUTILS_API_LOADING_STATE = "LOADING"

export const APIUTILS_API_SUCCESS_STATE = "SUCCESS"

export const APIUTILS_API_FAILED_STATE = "FAILED"

export const APIUTILS_API_KEY = "KEY"

export const API_CALL_NUMBER = "API_CALL_NUMBER"


export const createAPISubmitType = (apiKey) => NAME_KEYS_PREFIX + apiKey + SUBMIT_KEYS_POSTFIX


export const createAPISuccessType = (apiKey) => NAME_KEYS_PREFIX + apiKey + SUCCESS_KEYS_POSTFIX


export const createAPIFailedType = (apiKey) => NAME_KEYS_PREFIX + apiKey + FAILED_KEYS_POSTFIX


export const createAPICleanType = (apiKey) => NAME_KEYS_PREFIX + apiKey + CLEAN_KEYS_POSTFIX


export const createAPIapiTypes = (apiKey) => [createAPISubmitType(apiKey),
    createAPISuccessType(apiKey),
    createAPIFailedType(apiKey),
    createAPICleanType(apiKey)]

export const isApiAction = (apiKey, action) => {
    let apiTypes = createAPIapiTypes(apiKey)

    return apiTypes.find((element)=> action.type===element)
}

const callNumber = {}

const getNextCallNumber = (apiKey) => {
    if(callNumber.lastNumber == undefined){
        callNumber.lastNumber = 0
    }
    else{
        callNumber.lastNumber = callNumber.lastNumber >10000000 ? 0 :  callNumber.lastNumber + 1
    }
    callNumber.lastApiKey = apiKey
    return callNumber.lastNumber
}



export const callJSONAPI = (endpoint, apiKey, method='GET', body=undefined, options={}) => {
    let types = createAPIapiTypes(apiKey)

    types = types.map(type=>{return {type:type}})

    let meta = {[API_CALL_NUMBER]: getNextCallNumber(apiKey)}

    if (options[APIUTILS_API_KEY]) {
        meta[options[APIUTILS_API_KEY].keyParameter] = options[APIUTILS_API_KEY].keyValue
    }

    types[0].meta = meta
    types[1].meta = meta
    types[2].meta = meta

    let checkSaml = (action, state, res, successHandler) => {
        const contentType = res.headers.get('Content-Type')
        return res.clone().text().then(resBody => {
            if (contentType && ~contentType.indexOf('html') && resBody && ~resBody.indexOf(BODY_SAML_REQUEST)) {
                const errorBody = {status: 0, error: TIMEOUT_ERROR_MESSAGE}
                const blob = new Blob([JSON.stringify(errorBody, null, 2)], {type : 'application/json'})
                let myResponse = new Response(blob);
                return getJSON(myResponse)
            }

            if (successHandler && typeof successHandler === "function") return successHandler(action, state, res)

            if (options.xml) return resBody

            if (contentType.indexOf('json')===-1){
                return resBody
            }

            return getJSON(res)
        })
    }

    if(options.successCallback) {
        types[1].payload = (action, state, res) =>{ return checkSaml(action, state, res).then(json => { options.successCallback(action, state, json); return json;})}
    } else if(options.successHandler) {
        //TODO: adapt to include the checkSaml promise.
        types[1].payload = (action, state, res) => checkSaml(action, state, res, options.successHandler)
    } else {
        types[1].payload = checkSaml
    }

    if(options.errorCallback) {
        types[2].payload = (action, state, res) =>{ return getJSON(res).then(json => { options.errorCallback(action, state, json); return json;})}
    } else if(options.errorHandler) {
        types[2].payload = options.errorHandler
    }

    let headers, sBody
    if (options.xml) {
        headers = {
            'Content-Type': 'application/xml',
            'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
        sBody = body ? js2xml(body, {compact: true, ignoreComment: true, spaces: 4}) : undefined //TODO: options could be made a param.
    } else {
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
        sBody = JSON.stringify(body);
    }

    if (options.headers) {
        headers = Object.assign({}, headers, options.headers)
    }

    return {
        [RSAA]: {
            endpoint,
            headers: headers,
            method,
            body: sBody,
            types: types.slice(0,3)
        }
    }
}



export const cleanJSONAPIState = (apiKey, key) => {
    return key ? {
        type: createAPICleanType(apiKey),
        meta: {[key.keyParameter]: key.keyValue}
    } : {
        type: createAPICleanType(apiKey)
    }
}


export const apiReducer = (apiKey, initialDataState ={data:{}}, params={parser: p=>p, refreshType: APIUTILS_REFRESH_MANUAL}) => {
    let initialState = Object.assign({},{status: APIUTILS_API_NEW_STATE}, initialDataState)
    let dataKey = Object.keys(initialDataState)[0]
    let parser = params.parser != undefined  ? params.parser : p=>p
    let refreshType = params.refreshType || APIUTILS_REFRESH_MANUAL

    // TODO simplfy by having different reducer per refreshType
    return (state = initialState, action) => {
        let [submit, success, failed, clean] = createAPIapiTypes(apiKey)
        let remove = "apiUtils|GAME_HANDS|REMOVE"

        switch (action.type) {
            case submit:
                if(refreshType === APIUTILS_REFRESH_MANUAL)
                    return Object.assign({}, state, {
                            status: APIUTILS_API_LOADING_STATE,
                            isError: undefined,
                            isSuccess: undefined
                        },
                        action.meta ? {callNumber: action.meta[API_CALL_NUMBER]} : {}
                    )
                return state
            case success:
                //TODO: handle InternalError possibility
                if(refreshType === APIUTILS_REFRESH_MANUAL && action.meta && action.meta[API_CALL_NUMBER] != state.callNumber) {
                    return state
                }
                if(action.payload && action.payload.status === 0)
                    return Object.assign({}, state, {status: APIUTILS_API_FAILED_STATE, error: action.payload.error })
                else if((refreshType === APIUTILS_REFRESH_CHECK) && state.status === APIUTILS_API_SUCCESS_STATE) {
                    return Object.assign({}, state, {upToDate: (JSON.stringify(state.data) === JSON.stringify(parser(action.payload)))})
                }
                else {
                    let newState = Object.assign({}, state, {status: APIUTILS_API_SUCCESS_STATE})
                    let payload = action.payload
                    if (params.xml) {
                        payload = xml2js(payload, {compact: true, ignoreDeclaration: true}) // TODO: params for further options
                    }
                    newState[dataKey] = parser(payload)
                    return newState
                }
            case failed:
                if(refreshType === APIUTILS_REFRESH_MANUAL && action.meta && action.meta[API_CALL_NUMBER] != state.callNumber) {
                    return state
                }
                if((refreshType === APIUTILS_REFRESH_AUTO || refreshType === APIUTILS_REFRESH_CHECK) && this.state.status === APIUTILS_API_FAILED_STATE)
                    console.warn("Api keeps failing while refreshing, please check your requests")
                let error = action.payload.message
                if(action.payload.response && action.payload.response.error)
                {
                    error = error + " - " +  action.payload.response.error
                }
                return Object.assign({}, state, {status: APIUTILS_API_FAILED_STATE, error: error })
            case clean:
                return initialState
            case remove:
                let card_name = action.cardName
                let player = "P" + action.playerNum
                let playerN = "P" + action.playerNum
                let hands = action.state
                player = hands[playerN].filter(x => x.card_name !== card_name)
                hands[playerN] = player
                return {
                  ...state,
                  data: hands
                }
            default:
                return state
        }
    }
}
