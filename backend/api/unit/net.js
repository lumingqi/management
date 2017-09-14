const https = require('https')
const http = require('http')

module.exports.ajax = function (options, body) {
    return new Promise(function (resolve) {

        const req = https.request(options, (res) => {
            res.setEncoding('utf8')
            res.on('data', (d) => {
                let wxdata = JSON.parse(d.toString())
                console.log(wxdata)
                resolve(wxdata)
            })
        })
        if (options.method == 'POST') {
            req.write(body)
        }

        req.on('error', (e) => {
            console.error(e)
        });
        req.end()
    });
}
module.exports.ajaxhttp = function (options, body) {
    return new Promise(function (resolve) {
        const req = http.request(options, (res) => {
            res.setEncoding('utf8')
            res.on('data', (d) => {
                try {
                    let data = JSON.parse(d.toString())
                    console.log(data)
                    resolve(data)
                } catch (e) {
                    resolve({})
                }
            })
        })
        if (options.method == 'POST') {
            req.write(body)
        }

        req.on('error', (e) => {
            console.error(e)
        });
        req.end()
    });
}