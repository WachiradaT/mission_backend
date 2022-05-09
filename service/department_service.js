const { connect } = require('./config')
const { departmentModel } = require('../model/department_model')

async function getDepartment() {
    return new Promise(resolve => {
        const get_Department = 'select * from department'
        connect.query(get_Department, (err, departments, _) => {
            resolve(departments)
        })
    })
}

async function getDepartmentByDepartmentId(departmentID){
    return new Promise(resolve => {
        const get_Department = `select department.name,
        department.departmentid 
        from department WHERE departmentid = ${departmentID}`
        connect.query(get_Department, (err, departments, _) => {
            resolve(departments)
        })
    })
}

async function postDepartment(object){
    return new Promise(resolve => {
        const department = new departmentModel (object)
        const post_department = ` INSERT INTO department (name) 
        VALUES ('${department.name}')`
        connect.query(post_department,(err,message,_)=>{
            if (err)
                resolve(err)
            resolve(`create new department id ${message.insertId}`)
        })
    })
}

async function postDepartments (object) {
    return new Promise (resolve => {
        const department = new departmentModel(object)
        const post_Departments = ''
        connect.query(post_Departments,(err,departments,_)=>{
            if(err)
                resolve(err)
            resolve('create new department id ${departments}')
        })
    })
}

module.exports = {
    getDepartment,
    getDepartmentByDepartmentId,
    postDepartment
}