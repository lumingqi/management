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
var dbstr = 'mongodb://localhost/'
const querystring = require('querystring')
var net = require('../../unit/net')


/* 模版{
    "kf_account" : "test1@test",
    "nickname" : "客服1",
    "password" : "pswmd5",
} */

/* 鲁班{"kf_account":"gao@bullstech",
"nickname":"鲁班壹号",
"password":""
} */
//type 选填 add  del update 
module.exports.wxservice = function* wxservice(type) {
    if ('POST' != this.method) return yield next
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx30db7ec1537d9afc&secret=6a3a743d25071d06f82153d029dee8cf',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    var model = yield parse(this, {
        limit: '200kb'
    })

    let body = JSON.stringify(model)
    let options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/customservice/kfaccount/' + type + '?access_token=' + access_info.access_token,
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
module.exports.getwxserver = function* getwxserver() {
    if ('GET' != this.method) return yield next
    let access_smssend = {}
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx30db7ec1537d9afc&secret=6a3a743d25071d06f82153d029dee8cf',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    console.log(access_info)
    let options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/customservice/getkflist?access_token=' + access_info.access_token,
        method: 'GET',
    }
    access_smssend = yield net.ajax(options)
    this.body = yield access_smssend
    console.log(this.body)
}
module.exports.wxmass = function* wxmass() {
    /* 
        "touser":[
            "oZy8Uwatalkn5-N39nk0lVEFaDCw",
            "oZy8UwUZykMMoTgtYc2hysl-vSTY"
            ],
            "content":{"hello"} */
    let wxinfo = {}
    if ('POST' != this.method) return yield next
    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx30db7ec1537d9afc&secret=6a3a743d25071d06f82153d029dee8cf',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield net.ajax(access_options)
    var model = yield parse(this, {
        limit: '200kb'
    })
    let options = {
        "touser": model.touser,
        "msgtype": "text",
        "text": { "content": model.content }
    }
    var body = JSON.stringify(options)
    let wx_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/message/mass/send?access_token=' + access_info.access_token,
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
            'Content-Length': body.length,
        }
    }
    wxinfo = yield net.ajax(wx_options, body)
    this.body = yield wxinfo
}