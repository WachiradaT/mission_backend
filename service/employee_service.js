const { connect } = require('./config')
const { employeeModel } = require('../model/employee_model')

async function countEmployeeByDepartmentId(departmentId) {
    return new Promise(resolve => {
        const count_employee = `select count(employeeId) as employees from works where departmentid = ${departmentId}`
        connect.query(count_employee, (err, total_employee, _) => {
            resolve(total_employee[0].employees)
        })
    })
}

async function countEmployeeSalaryByDepartmentId(departmentId) {
    return new Promise(resolve => {
        const count_salary = `select sum(employee.salary) as salary 
        from works
        join employee on works.employeeId = employee.employeeid
        where works.departmentid = ${departmentId}
        `
        connect.query(count_salary, (err, total_salary, _) => {
            if (!total_salary[0].salary)
                resolve(0)
            resolve(total_salary[0].salary)
        })
    })
}

async function getEmployeeStartWorks() {
    return new Promise(resolve => {
        const get_employee_startworks = `SELECT employee.employeeid,
        employee.name,
        employee.lastName,
        employee.address,
        employee.phoneNumber as phone_number,
        employee.salary,
        employee.age,
        works.startDate as start_date
        FROM employee
        JOIN works on employee.employeeid = works.employeeid`
        connect.query(get_employee_startworks, (err, employees, _) => {
            resolve(employees)
        })
    })
}

async function getIDByOrder() {
    return new Promise (resolve => {
        const get_Id = ''
        connect.query(get_Id,(err,Id,_)=>{
            resolve(Id)
        })
    })

}

async function getOrder(){
    return new Promise (resolve => {
        const order = ''

        connect.query(order,(err,orders,_) => {
            resolve(orders)
        })
    })
}

async function getEmployeeStartWorksByEmployeeId(employeeId) {
    return new Promise(resolve => {
        const get_employee_startworks = `SELECT employee.employeeid,
        employee.name,
        employee.lastName,
        employee.address,
        employee.phoneNumber as phone_number,
        employee.salary,
        employee.age,
        works.startDate as start_date
        FROM employee
        JOIN works on employee.employeeid = works.employeeid
        where employee.employeeid = ${employeeId}`
        connect.query(get_employee_startworks, (err, employees, _) => {
            resolve(employees)
        })
    })
}

async function  getEmployeesByDepartmentId(departmentID){
    return new Promise(resolve => {
        const get_employeeby_department = `Select employee.employeeid,
        employee.name,
        employee.lastName,
        employee.address,
        employee.phoneNumber as phone_number,
        employee.salary,
        employee.age,
        works.startDate as start_date FROM works
        JOIN employee ON works.employeeId = employee.employeeid
        WHERE works.departmentid = ${departmentID}`
        connect.query(get_employeeby_department, (err, employeeDepartment,_) => {
            resolve(employeeDepartment)
        })
    })
}

async function getEmployee() {
    return new Promise(resolve => {
        const get_employee = 'select * from employee'
        connect.query(get_employee, (err, employee, _) => {
            resolve(employee)
        })
    })
}

async function postEmployee(object) {
    return new Promise(resolve => {
        const employee = new employeeModel(object)
        const post_employee = `INSERT INTO employee (name, lastName, address, phoneNumber, salary, age) 
        VALUES (
            '${employee.name}', 
            '${employee.lastName}', 
            '${employee.address}', 
            '${employee.phoneNumber}', 
            ${employee.salary}, 
            ${employee.age})`
        connect.query(post_employee, (err, message, _) => {
            if (err)
                resolve(err)
            resolve(`create new employee id ${message.insertId}`)
        })
    })
}


module.exports = { 
    countEmployeeByDepartmentId,
    countEmployeeSalaryByDepartmentId,
    getEmployeeStartWorks,
    getEmployeeStartWorksByEmployeeId,
    getEmployeesByDepartmentId,
    getEmployee,
    postEmployee
}