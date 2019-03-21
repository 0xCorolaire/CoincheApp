import * as apiUtils from "./apiUtils"

export const apStAg = (apis) => {
    let sts = undefined
    let listSt = apis.map(api => api.status)
    let errors = []
    if (listSt.length === 0 || !listSt.map(i => i != undefined).reduce((a, b) => a && b))
        return {status: apiUtils.APIUTILS_API_NEW_STATE}
    else if(listSt.find(status => status == apiUtils.APIUTILS_API_LOADING_STATE))
        sts=apiUtils.APIUTILS_API_LOADING_STATE
    else if(listSt.find(status => status == apiUtils.APIUTILS_API_FAILED_STATE)){
        sts = apiUtils.APIUTILS_API_FAILED_STATE
        apis.map(api => {
            if(api.status === apiUtils.APIUTILS_API_FAILED_STATE && api.error)
                errors.push(api.error)
        })
    }
    else if(listSt.find(status => status == apiUtils.APIUTILS_API_NEW_STATE))
        sts=apiUtils.APIUTILS_API_NEW_STATE
    else sts = apiUtils.APIUTILS_API_SUCCESS_STATE

    if(sts === apiUtils.APIUTILS_API_FAILED_STATE)
        return {status: sts, errors: errors}

    return {status: sts}
}

export default apStAg
