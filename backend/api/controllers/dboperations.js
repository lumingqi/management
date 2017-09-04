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
var dbstr = 'mongodb://localhost/'
const accessKeyId = 'ACSFUX7fLUMpBZM1'
const secretAccessKey = 'qsGNrvuGnu'
const queueName = 'Alicom-Queue-1420938370661882-'
const https = require('https')
const http = require('http')
const smsdb = 'lubansms'
const querystring = require('querystring')

function checkId(id) {
    let result = false
    if (id && (id.length == 12 || id.length == 24)) {
        result = true
    }
    return result
}
function getdbstr(db) {
    let dbtemp = "lubandemo"
    if (db && db.length > 0) {
        dbtemp = db
    }
    return dbstr + dbtemp
}
module.exports.login = function* login(db, next) {
    if ('POST' != this.method) return yield next
    var user = yield parse(this, {
        limit: '500kb'
    })
    console.log(user)
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection('employee')
    let options = []
    options.push({
        '$match': {
            'pwd': user.pwd,
            'tel': user.user,
            'lock': false
        }
    })
    options.push({
        '$unwind': '$roles_id'
    })
    options.push({
        '$lookup': {
            'localField': 'roles_id',
            'from': 'role',
            'foreignField': '_id',
            'as': 'role'
        }
    })
    let cursor = table.aggregate(options)
    let model = yield cursor.toArray()
    console.log(model)
    var token = ''
    var code = -1
    var message = '登录失败'
    var account = {}
    if (model.length > 0) {
        var profile = {
            user: user.user,
            id: model[0]._id
        }
        account = model[0]
        account.roles = null
        delete account.roles
        account.roles = []
        for (var item of model) {
            if (item.role.length > 0) {
                account.roles.push(item.role[0])
            }
        }
        account.pwd = null
        delete account.pwd
        token = jwt.sign(profile, 'luban', { expiresIn: 60 * 60 * 24 * 3 /* 1 days */ })
        code = 0
        message = '登录成功'
    } else {
        var profile = {
            user: user.user,
            id: 0
        }

        if (user.user == 'luban' && user.pwd == 'e10adc3949ba59abbe56e057f20f883e') {
            token = jwt.sign(profile, 'luban', { expiresIn: 60 * 60 * 24 * 3 /* 1 days */ })
            code = 0
            message = '登录成功'
            account.name = 'luban'
            account._id = 0
            account.tel = 'luban'
        }
    }
    db.close()
    let nowtime = new Date().getTime()
    this.body = {
        code,
        token,
        message,
        account,
        nowtime
    }
}

function changeModelId(model) {
    for (var item in model) {
        if (typeof item == 'string') {
            if (item.indexOf('_id') >= 0) {
                try {
                    console.log('-----', item, model[item], typeof model[item])
                    if (typeof model[item] === 'object') {
                        let iditem = model[item]
                        for (var idindex in iditem) {
                            if (checkId(iditem[idindex])) {
                                let monkid = ObjectID(iditem[idindex])
                                iditem[idindex] = monkid
                                console.log('-----', iditem[idindex], monkid)
                            }
                        }

                    } else {
                        if (checkId(model[item])) {
                            let monkid = ObjectID(model[item])
                            model[item] = monkid
                        }
                    }

                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
}

function verify(token, authtime) {
    let result = false
    console.log(token, authtime)
    if (token) {
        try {
            var profile = jwt.verify(token, 'luban')
            let nowtime = new Date().getTime()
            let authtimebegin = Number(authtime) - 1000 * 60 * 5
            let authtimeend = Number(authtime) + 1000 * 60 * 60
            console.log(profile, nowtime, authtimebegin, authtimeend, authtime)
            if (authtimebegin < nowtime && nowtime < authtimeend) {
                result = true
            }
        } catch (e) {
            console.log(e)
        }
    }
    return result
}
module.exports.all = function* all(db, name, next) {
    if ('GET' != this.method) return yield next
    let token = this.req.headers.authorization
    let authtime = this.req.headers.authtime
    console.log(db)
    if (db != 'webclone' && db != 'test') {
        if (!verify(token, authtime)) {
            this.status = 401
            console.log('Access Forbidden')
            this.body = 'Access Forbidden'
            return
        }
    }
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    let query = this.query
    let limit = Number.parseInt(query.prepage || 30)
    let skip = Number.parseInt(query.page || 0) * limit
    let filter = query.filter
    let findObj = {}
    let sortObj = {}
    let findsort = false
    let options = []
    console.log(filter)
    if (filter) {
        try {
            let filterObj = JSON.parse(Buffer.from(filter, 'base64').toString())
            if (filterObj) {
                for (var item of filterObj) {
                    let value = item.value
                    let type = item.type
                    let key = item.key
                    if (type == 'sort') {
                        findsort = true
                        sortObj[key] = Number(value)
                    } else if (type == 'like') {
                        let like = new RegExp(value)
                        findObj[key] = like
                    } else if (type == 'unwind') {
                        options.push({ '$unwind': value })
                    } else if (type == 'lookup') {
                        options.push({ '$lookup': value })
                    } else if (type == 'lt') {
                        findObj[key] = findObj[key] || {}
                        findObj[key]['$lt'] = value
                        console.log(findObj[key])
                    } else if (type == 'gt') {
                        findObj[key] = findObj[key] || {}
                        findObj[key]['$gt'] = value
                        console.log(findObj[key])
                    } else if (type == 'lte') {
                        findObj[key] = findObj[key] || {}
                        findObj[key]['$lte'] = value
                        console.log(findObj[key])
                    } else if (type == 'gte') {
                        findObj[key] = findObj[key] || {}
                        findObj[key]['$gte'] = value
                        console.log(findObj[key])
                    } else {
                        findObj[key] = value
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    changeModelId(findObj)
    if (!findsort) {
        sortObj = { '_id': -1 }
    }
    let count = yield table.count(findObj)
    options.push({ '$match': findObj })
    options.push({ '$sort': sortObj })
    options.push({ '$skip': skip })
    options.push({ '$limit': limit })
    console.log(options, name, count)
    let cursor = table.aggregate(options)
    let data = yield cursor.toArray()
    db.close()
    let nowtime = new Date().getTime()
    this.body = yield {
        'data': data,
        'count': count,
        'name': name,
        'nowtime': nowtime
    }

}
module.exports.upload = function* upload(db, next) {
    if ('POST' != this.method) return yield next
    if (!this.request.is('multipart/*')) return yield next

    var parts = uploadparse(this)

    while ((part = yield parts)) {
        var ext = path.extname(part.filename)
        var filename = parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext
        var newPath = path.resolve('public/upload', filename)
        var stream = fs.createWriteStream(newPath)
        part.pipe(stream)
        console.log('uploading %s -> %s', part.filename, stream.path)
    }

    this.body = yield { success: 1, name: filename, url: 'http://www.bullstech.cn:9999/upload/' + filename }
}

module.exports.fetch = function* fetch(db, name, id, next) {
    if ('GET' != this.method) return yield next
    if (!checkId(id)) return yield next
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    var model = yield table.find({ '_id': ObjectID(id) }).toArray()
    if (model.length === 0) {
        this.throw(404, 'model with _id = ' + id + ' was not found')
    }
    db.close()
    this.body = yield model
}

module.exports.add = function* add(db, name, next) {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '5000kb'
    })
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    let seqid = yield db.collection('lb_seq_id').findOneAndUpdate({ id: name }, { $inc: { seq: 1 } }, { upsert: true })
    model.lbseqid = seqid.seq
    changeModelId(model)
    console.log(model)
    var inserted = yield table.insert(model)
    if (!inserted) {
        this.throw(405, 'The model couldn\'t be added.')
    }
    db.close()
    this.body = yield model
}

module.exports.modify = function* modify(db, name, id, next) {
    if ('PUT' != this.method) return yield next
    if (!checkId(id)) return yield next
    var data = yield parse(this, {
        limit: '5000kb'
    })
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    changeModelId(data)
    var result = yield table.updateOne({ '_id': ObjectID(id) }, {
        $set: data
    })
    db.close()
    this.body = result
}

module.exports.bulkWrite = function* bulkWrite(db, name, next) {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '5000kb'
    })
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    let writeobj = []

    model.forEach((element) => {
        changeModelId(element)
        let opt = {}
        if (element._id) {
            if (element._delete) {
                opt.deleteOne = {
                    filter: { '_id': element._id }
                }
            } else {
                opt.updateOne = {
                    filter: { '_id': element._id }
                    , update: { $set: element }
                }
            }
        } else {
            opt.insertOne = {
                document: element
            }
        }
        writeobj.push(opt)
    })
    var result = yield table.bulkWrite(writeobj)
    db.close()
    this.body = result
}

module.exports.remove = function* remove(db, name, id, next) {
    if ('DELETE' != this.method) return yield next
    if (!checkId(id)) return yield next
    var db = yield MongoClient.connect(getdbstr(db))
    let table = db.collection(name)
    var removed = yield table.remove({ '_id': ObjectID(id) })
    db.close()
    if (!removed) {
        this.throw(405, 'Unable to delete.')
    } else {
        this.body = '{"success":1}'
    }
}


module.exports.head = function* () {
    return yield
}

module.exports.options = function* () {
    this.set('Access-Control-Allow-Method', 'HEAD,GET,PUT,DELETE,OPTIONS')
    this.set('Access-Control-Allow-Origin', '*')
    this.status = 204
    this.body = yield 'Allow: HEAD,GET,PUT,DELETE,OPTIONS'
}

module.exports.trace = function* () {
    this.body = yield 'Smart! But you can\'t trace.'
}

module.exports.checksms = function* checksms(next) {
    if ('POST' != this.method) return yield next
    var sms = yield parse(this, {
        limit: '500kb'
    })
    var db = yield MongoClient.connect(getdbstr(smsdb))
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
module.exports.sms = function* () {
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

    var db = yield MongoClient.connect(getdbstr(smsdb))
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
        SignName: '鲁班SAAS系统',
        TemplateCode: 'SMS_81415024',
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

function ajax(options, body) {
    return new Promise(function (resolve) {
        const req = https.request(options, (res) => {
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
function ajaxhttp(options, body) {
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

module.exports.wxregpost = function* wxregpost() {
    if ('POST' != this.method) return yield next
    var model = this.req.body.xml
    var signature = this.query.signature
    var timestamp = this.query.timestamp
    var nonce = this.query.nonce
    var openid = this.query.openid
    var echostr = this.query.echostr
    var token = 'bullstech'
    console.log(model,openid)
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
    var token = 'bullstech'
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
        path: '/sns/oauth2/access_token?appid=wx30db7ec1537d9afc&secret=6a3a743d25071d06f82153d029dee8cf&code=' + model.code + '&grant_type=authorization_code',
        method: 'GET'
    }
    wxinfo = yield ajax(options)
    let wxobj = {}
    if (wxinfo) {
        wxobj.openid = wxinfo.openid
    }
    this.body = yield wxobj
}

module.exports.wxqrcode = function* wxqrcode(db, id, next) {
    if ('GET' != this.method) return yield next
    let wxinfo = {}
    let qcdata = { "action_name": "QR_LIMIT_SCENE", "action_info": { "scene": { "scene_id": id } } }
    let body = JSON.stringify(qcdata)

    let access_options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid=wx30db7ec1537d9afc&secret=6a3a743d25071d06f82153d029dee8cf',
        method: 'GET',
    }
    let access_info = {}
    access_info = yield ajax(access_options)
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
    console.log(options)
    wxinfo = yield ajax(options, body)
    this.body = yield wxinfo
}

module.exports.smssend = function* smssend() {
    if ('POST' != this.method) return yield next
    var model = yield parse(this, {
        limit: '200kb'
    })
    console.log(model)
    let smsdata = {
        type: 'send',
        username: '18960828505',
        password: 'A750A4CDD88D39140D81D71615824272',
        gwid: '408fbb2',
        mobile: model.mobile,
        rece: 'json',
        message: '【' + model.title + '】' + model.message
    }
    let body = querystring.stringify(smsdata)

    let options = {
        hostname: 'jk.106api.cn',
        port: 80,
        path: '/smsUTF8.aspx',
        method: 'POST',
        agent: false,
        rejectUnauthorized: false,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            'Content-Length': body.length,
        }
    }
    let smssendinfo = {}
    smssendinfo = yield ajaxhttp(options, body)
    var db = yield MongoClient.connect(getdbstr(model.db))
    let smssends = yield db.collection('smssend').insert(
        {
            smssendinfo,
            model
        })
    this.body = yield smssendinfo
}

module.exports.getsmssend = function* getsmssend() {
    if ('GET' != this.method) return yield next
    let access_smssend = {}
    let get_options = {
        hostname: 'jk.106api.cn',
        port: 80,
        path: '/statusApi.aspx?type=query&username=18960828505&password=A750A4CDD88D39140D81D71615824272&rece=json',
        method: 'GET',
    }
    access_smssend = yield ajaxhttp(get_options)
    this.body = yield access_smssend
}
/* module.exports.alipay = function* alipay(){
    if('POST'!=this.method) return yield next
        var model = yield parse(this, {
            limit: '200kb'
        })
        console.log(model)
        let ali ={}
        let pay ={

        }
} */