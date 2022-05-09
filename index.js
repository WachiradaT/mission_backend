const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

//router 
const employee = require('./router/employee')
const department = require('./router/department')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/employee', employee)
app.use('/department', department)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(3000, _ => {
    console.log('server is running at port 3000')
})