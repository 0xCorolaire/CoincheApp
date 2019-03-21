import URL from 'url-parse'
export const saferURL = (unsafeURL) => {
    let url = URL(unsafeURL,{})

    let saferURL = ""
    switch (url.protocol){
        case "mailto:":
            saferURL = unsafeURL
            break;
        case "http:":
        case "https:":
            saferURL = encodeURI(unsafeURL)
            break;
        case "":
            let tempURL = url.pathname
            tempURL += url.query ? "?" + url.query : ""
            tempURL += url.hash ? url.hash : ""
            saferURL = encodeURI(tempURL)
            break;
        default:
            saferURL = ""
    }

    return saferURL
}
