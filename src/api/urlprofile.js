const apiUrl2 = 'http://api.yx101.cn/'
const apiUrl1 = 'http://api.yx101.cn/'

let apiUrl = 'http://api.yx101.cn/'
if (LUBANDEV) {
    apiUrl += 'management/'
} else {
    let host = window.location.host
    let dbindex = host.indexOf('.')
    let dbstr = 'management/'
    if (dbindex > 0) {
        dbstr = host.substring(0, dbindex)
        dbstr += '/'
    }
    apiUrl += dbstr
}

function getLoginUrl() {
    return apiUrl + 'login/'
}

function getApiUrl() {
    return apiUrl + 'api/'
}

function getUrlQccode(id) {
    return apiUrl + 'wxqrcode/' + id
}

function getUrls(model) {
    return apiUrl + 'apis/' + model + '/'
}

function getUrl(model) {
    return getApiUrl() + model + '/'
}

function getUrlById(model, id) {
    return getApiUrl() + model + '/' + id
}

function getUrlField(model, fields) {
    return getApiUrl() + model + '/?fields=' + encodeURIComponent(fields.join())
}

function getUrlFilter(model, filter, prepage, page) {
    return getApiUrl() + model + '/?page=' + page + '&prepage=' + prepage + '&filter=' + filter
}

export default {
    getUrl,
    getUrls,
    getUrlField,
    getUrlById,
    apiUrl,
    getUrlFilter,
    getLoginUrl,
    getUrlQccode
}
