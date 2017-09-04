var control = require('./controllers/dboperations')
var compress = require('koa-compress')
var logger = require('koa-logger')
var serve = require('koa-static')
var route = require('koa-route')
var cors = require('koa-cors')
var koa = require('koa')
var path = require('path')
var xmlparse = require('./controllers/xmlparse')
var app = module.exports = new koa()

app.use(logger())
app.use(cors())
app.use(xmlparse())

app.use(route.post('/wxreg/', control.wxregpost))
app.use(route.get('/wxreg/', control.wxreg))
app.use(route.post('/wx/', control.wx))
app.use(route.post('/smssend/', control.smssend))
app.use(route.get('/getsmssend/', control.getsmssend))
app.use(route.get('/:db/wxqrcode/:id', control.wxqrcode))
app.use(route.post('/sms/', control.sms))
app.use(route.post('/checksms/', control.checksms))
app.use(route.post('/:db/login/', control.login))
app.use(route.post('/:db/upload', control.upload))
app.use(route.get('/:db/api/:name', control.all))
app.use(route.get('/:db/api/:name/:id', control.fetch))
app.use(route.post('/:db/api/:name', control.add))
app.use(route.post('/:db/apis/:name', control.bulkWrite))
app.use(route.put('/:db/api/:name/:id', control.modify))
app.use(route.delete('/:db/api/:name/:id', control.remove))

app.use(route.options('/', control.options))
app.use(route.trace('/', control.trace))
app.use(route.head('/', control.head))

// Serve static files
app.use(serve(path.join(__dirname, 'public')))

// Compress
app.use(compress())

if (!module.parent) {
    app.listen(8888)
    console.log('listening on port 8888')
}
