const mysql = require('mysql')

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mission'
})

connect.connect()

module.exports = { connect }