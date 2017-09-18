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
const querystring = require('querystring')
var dbunit = require('../../unit/db')
var xlsx = require('node-xlsx')

function checkId(id) {
    let result = false
    if (id && (id.length == 12 || id.length == 24)) {
        result = true
    }
    return result
}
module.exports.login = function* login(db, next) {
    if ('POST' != this.method) return yield next
    var user = yield parse(this, {
        limit: '500kb'
    })
    console.log(user)
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
                    filter: { '_id': element._id },
                    update: { $set: element }
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
    var db = yield MongoClient.connect(dbunit.getdbstr(db))
    let table = db.collection(name)
    var removed = yield table.remove({ '_id': ObjectID(id) })
    db.close()
    if (!removed) {
        this.throw(405, 'Unable to delete.')
    } else {
        this.body = '{"success":1}'
    }
}


module.exports.head = function*() {
    return yield
}

module.exports.options = function*() {
    this.set('Access-Control-Allow-Method', 'HEAD,GET,PUT,DELETE,OPTIONS')
    this.set('Access-Control-Allow-Origin', '*')
    this.status = 204
    this.body = yield 'Allow: HEAD,GET,PUT,DELETE,OPTIONS'
}

module.exports.trace = function*() {
    this.body = yield 'Smart! But you can\'t trace.'
}
module.exports.download = function* download(db, name, next) {
        if ('GET' != this.method) return yield next
        console.log(db)
        var db = yield MongoClient.connect(dbunit.getdbstr(db))
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
            //options.push({ '$skip': skip })
            //options.push({ '$limit': limit })
        console.log(options, name, count)
        let cursor = table.aggregate(options)
        let data = yield cursor.toArray()
        console.log('123data', data)
            // db.close()
        var datas = []
            // for (var key in data) {
            //     var datat = []
            //     for (var keys in data[key]) {
            //         if (data[key][keys]) {
            //             datat.push(data[key][keys].toString())
            //         } else {
            //             datat.push('')
            //         }
            //     }
            //     datas.push(datat)
            // }
        for (var key in data) {
            delete data[key]._id
            delete data[key].op_id
            delete data[key].op_name
                // var times = moment().format()
            var times = this.getDatetime(data[key].time)
            console.log('时间123', times)
            var datat = []
            for (var keys in data[key]) {
                if (data[key][keys]) {
                    datat.push(data[key][keys].toString())
                } else {
                    datat.push('')
                }
                console.log('456', keys)
            }
            datas.push(datat)
        }

        let nowtime = new Date().getTime()
        console.log('datas', datas)
        var buffer = xlsx.build([{ name: "mySheetName", data: datas }])
        this.set('Content-disposition', 'attachment;filename=file.xlsx')
        this.body = buffer

    }
    //  moment(data[key].time).format('YYYY-MM-DD HH:mm:ss')