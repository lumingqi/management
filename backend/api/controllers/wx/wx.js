'use strict'
var crypto = require('crypto')
var parse = require('co-body')
var uploadparse = require('co-busboy')
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
const jwt = require('jsonwebtoken')
var fs = require('fs')
var Buffer = require('buffer').Buffer
var path = require('path')
var axios = require('axios')
var dbstr = 'mongodb://localhost/'
const querystring = require('querystring')
var net = require('../../unit/net')
var config = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx7e0aa09a76fe616b', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: ['chooseImage',//拍照或从手机相册中选图接口
        'previewImage',//预览图片接口
        'uploadImage',//上传图片接口
        'downloadImage'//下载图片接口
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
}
module.exports.wx = function* wx() {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '200kb'
    })
    console.log(model)
    let wxinfo = {}
    let options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/sns/oauth2/access_token?appid=wx7e0aa09a76fe616b&secret=def8cea610a77523e47b42d9a28f9182&code=' + model.code + '&grant_type=authorization_code',
        method: 'GET'
    }
    wxinfo = yield net.ajax(options)
    console.log(wxinfo)
    let wxobj = {}
    if (wxinfo) {
        console.log(wxinfo.openid)
        wxobj.openid = wxinfo.openid
    }
    this.body = yield wxobj
}

module.exports.wxqrcode = function* wxqrcode(db, id, next) {
    if ('GET' != this.method) return yield next
    let wxinfo = {}
    let qcdata = { "action_name": "QR_LIMIT_SCENE", "action_info": { "scene": { "scene_id": id } } }
    let body = JSON.stringify(qcdata)
    console.log(body)
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    let options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/qrcode/create?access_token=' + access_info.access_token,
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
            'Content-Length': body.length,
        }
    }
    wxinfo = yield net.ajax(options, body)
    this.body = yield wxinfo
}
module.exports.wxsignature = function* wxsignature() {
    if ('GET' != this.method) return yield next
    this.body = yield config
}
module.exports.wxjssignature = function () {
    let access_smssend = {}
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b&secret=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    let access_info = {}
    net.ajax(access_options).then(access_info => {
        let options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/ticket/getticket?access_token=' + access_info.access_token + '&type=jsapi',
            method: 'GET',
        }
        return net.ajax(options)
    }).then(access_smssend => {
        var sha1Code = crypto.createHash('sha1')
        config.timestamp = parseInt(new Date().getTime() / 1000)
        var code = sha1Code.update(access_smssend.ticket + config.timestamp, 'utf-8').digest('hex')
        config.nonceStr = code.substring(0, 16)


        var str = `jsapi_ticket=${access_smssend.ticket}&noncestr=${config.nonceStr}&timestamp=${config.timestamp}&url=http://wx.yx101.cn/`
        var sha2Code = crypto.createHash('sha1')
        config.signature = sha2Code.update(str, 'utf-8').digest('hex')
    })
}
//获取 access_token
module.exports.wxmenus = function* wxmenus() {
    if ('GET' != this.method) return yield next
    let access_smssend = {}
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b&secret=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    // console.log(access_info.access_token)
    // let options = {
    //     hostname: 'api.weixin.qq.com',
    //     port: 443,
    //     path: '/cgi-bin/ticket/getticket?access_token=' + access_info.access_token + '&type=jsapi',
    //     method: 'GET',
    // }
    // access_smssend = yield net.ajax(options)
    this.body = yield access_info
    /*let wx_item = {
        "button": [
            {
                "name": "我",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "我的资料",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn/login.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                    {
                        "type": "view",
                        "name": "我的报修",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn/login.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                    {
                        "type": "view",
                        "name": "我的维修",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn/login.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                ]
            },
            {
                "name": "报修",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "家里的报修",
                        "url": "http://wx.yx101.cn/"
                    },
                    {
                        "type": "view",
                        "name": "公共的报修",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                ]
            },
            {
                "name": "其他",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "投票",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                    {
                        "type": "view",
                        "name": "公共维修意见",
                        "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e0aa09a76fe616b&redirect_uri=http://wx.yx101.cn&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
                    },
                ]
            }
        ]
    }
    */
    /*let body = JSON.stringify(wx_item)
    console.log(body) */
    /*  let options = {
         hostname: 'api.weixin.qq.com',
         port: 443,
         path: '/cgi-bin/menu/create?access_token=' + access_info.access_token,
         method: 'POST',
         json: true,
         headers: {
             "content-type": "application/json",
             'Content-Length': body.length,
         }
     }
     let wxinfo = yield net.ajax(options, body) */
    /*  this.body = yield { access_info, wxinfo } */

}

module.exports.wxregpost = function* wxregpost() {
    if ('POST' != this.method) return yield next
    var model = this.req.body.xml
    var signature = this.query.signature
    var timestamp = this.query.timestamp
    var nonce = this.query.nonce
    var Event = model.Event
    var openid = this.query.openid
    var echostr = this.query.echostr
    var token = 'bullstech'
    /*   console.log('signature:' + signature, 'timestamp:' + timestamp, 'nonce:' + nonce, 'echostr:' + echostr, 'token' + token) */
    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token, timestamp, nonce)
    array.sort()
    var str = array.toString().replace(/,/g, '')
    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash('sha1')
    var code = sha1Code.update(str, 'utf-8').digest('hex')

    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    console.log(Event)
    //欢迎关注布尔斯科技,如果你要登陆学生端,请点击菜单关于鲁班到学生端,查看你的信息吧
    if (Event.indexOf('SCAN') != -1 || Event.indexOf('subscribe') != -1) {
        net.ajax(access_options).then(access_info => {
            let textdata = `{
            "touser":"${openid}",
            "msgtype":"text",
            "text":{
                 "content":"欢迎关注布尔斯科技"
            }
        }`
            let options = {
                hostname: 'api.weixin.qq.com',
                port: 443,
                path: '/cgi-bin/message/custom/send?access_token=' + access_info.access_token,
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    'Content-Length': textdata.length,
                }
            }
            let texts = net.ajax(options, textdata)
            console.log(texts)
        })
    }
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        this.body = ''
    } else {
        this.body = 'error'
    }
}
module.exports.wxreg = function* wxreg() {
    if ('GET' != this.method) return yield next
    var signature = this.query.signature
    var timestamp = this.query.timestamp
    var nonce = this.query.nonce
    var echostr = this.query.echostr
    var token = 'yongxinwuye'
    console.log('signature:' + signature, 'timestamp:' + timestamp, 'nonce:' + nonce, 'echostr:' + echostr, 'token' + token)

    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token, timestamp, nonce)
    array.sort()
    var str = array.toString().replace(/,/g, '')

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash('sha1')
    var code = sha1Code.update(str, 'utf-8').digest('hex')

    console.log(code, signature, code === signature)
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
        this.body = echostr
    } else {
        this.body = 'error'
    }
}
module.exports.wxmedia = function* wxmedia() {
    if ('POST' != this.method) return yield next
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    let access_info = yield net.ajax(access_options)
    var model = yield parse(this, {
        limit: '200kb'
    })
    let body = JSON.stringify(model)
    console.log(body)
    let options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/material/batchget_material?access_token=' + access_info.access_token,
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
            'Content-Length': body.length,
        }
    }
    let wxinfo = yield net.ajax(options, body)
    this.body = yield wxinfo
}
module.exports.wxpostmsg = function* wxpostmsg() {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '200kb'
    })
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx7e0aa09a76fe616b&secret=def8cea610a77523e47b42d9a28f9182',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    let reqinfo={}
    axios.post('http://api.weixin.qq.com/cgi-bin/message/template/send?access_token=' + access_info.access_token, model).then(obj => {
        console.log(obj)
        reqinfo=obj
    })
    this.body = yield reqinfo
}
