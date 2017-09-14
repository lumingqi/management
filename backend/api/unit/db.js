
var dbstr = 'mongodb://localhost/'
module.exports.getdbstr = function (db) {
    let dbtemp = "lubandemo"
    if (db && db.length > 0) {
        dbtemp = db
    }
    return dbstr + dbtemp
}