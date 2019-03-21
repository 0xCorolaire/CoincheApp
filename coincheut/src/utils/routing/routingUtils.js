import { saferURL } from "../security"

export const createAbsoluteURL = (relativePath = '', queryString = '') => {
    const rootPath = window.location.href.substr(0, window.location.href.lastIndexOf('#'))
    return saferURL(rootPath + '#' + relativePath + queryString)
}
