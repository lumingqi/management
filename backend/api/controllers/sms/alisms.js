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
const SMSClient = require('./smsclient.js')
const accessKeyId = 'LTAIMrq9iMYUEYMf'
const secretAccessKey = 'm8Hp6L0LFITep2qRCJaZzumV1JXMdq'
const queueName = 'Alicom-Queue-1724198893572049-'
const smsdb = 'lubansms'
const querystring = require('querystring')
var net = require('../../unit/net')
var dbunit = require('../../unit/db')


module.exports.alisms = function* alisms() {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '200kb'
    })
    console.log(model)
    let smsClient = new SMSClient({ accessKeyId, secretAccessKey })
    function addNumber(count) {
        let str = '';
        for (var i = 0; i < count; i += 1) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    }
    let number = addNumber(6)

    var db = yield MongoClient.connect(dbunit.getdbstr(smsdb))
    let nowtime = new Date().getTime()
    let smssend = yield db.collection('smssend').insert(
        {
            'phone': model.phone,
            'number': number,
            'smstime': nowtime
        })
    let sms = yield db.collection('sms').findOneAndUpdate(
        {
            phone: model.phone
        },
        {
            'phone': model.phone,
            'number': number,
            'smstime': nowtime,
            'smscheck': false
        },
        {
            upsert: true
        })

    let res = yield smsClient.sendSMS({
        PhoneNumbers: model.phone,
        SignName: '永兴物业',
        TemplateCode: 'SMS_98060016',
        TemplateParam: JSON.stringify({ 'number': number })
    })
    let { Code } = res
    let smsinfo = {}
    smsinfo.info = 'Send OK'
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
        //smsinfo.res = res
    } else {
        smsinfo.info = 'Send Error'
    }
    this.body = yield smsinfo
}


module.exports.alichecksms = function* alichecksms(next) {
    if ('POST' != this.method) return yield next
    var sms = yield parse(this, {
        limit: '500kb'
    })
    var db = yield MongoClient.connect(dbunit.getdbstr(smsdb))
    let table = db.collection('sms')
    let options = []
    options.push({
        '$match': {
            'phone': sms.phone,
            'number': sms.number
        }
    })
    let cursor = table.aggregate(options)
    let model = yield cursor.toArray()
    let status = -1
    let info = '未发现短信检查'
    let nowtime = new Date().getTime()
    if (model.length > 0) {
        if (model[0].smscheck) {
            status = -2
            info = '短信已经检测'
        } else if (nowtime - 30 * 60 * 1000 <= model[0].smstime && model[0].smstime <= nowtime) {
            status = 0
            info = '短信验证通过'
            let smscheck = yield table.findOneAndUpdate(
                {
                    phone: model.phone
                },
                {
                    'smscheck': true
                })
        } else {
            info = '短信已经超时'
            status = -3
        }
    }
    db.close()
    this.body = yield { status }
}