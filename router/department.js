const express = require('express')
const router = express.Router()
const {
    getDepartment,
    getDepartmentByDepartmentId,
    postDepartment
} = require('../service/department_service')
const {
    countEmployeeByDepartmentId,
    countEmployeeSalaryByDepartmentId,
    getEmployeesByDepartmentId,
} = require('../service/employee_service')

router.get('/', async (req, res) => {

    const departments = await getDepartment()
    let department1 = []
    for (const department of departments) {
        const department_1 = {
            departmentid: department.departmentid,
            name: department.name,
            total_employee: await countEmployeeByDepartmentId(department.departmentid),
            total_salary: await countEmployeeSalaryByDepartmentId(department.departmentid),
        }
        department1.push(department_1)
    }
    const result1 = {
        data: department1,
        unit: department1.length
    }
    res.send(result1)
})

router.get('/getDepartmentById/:id', async (req, res) => {
    const department2 = await getDepartmentByDepartmentId(req.params.id)
    const result1 = {
        data: department2,
        unit: department2.length
    }
    res.send(result1)
})

router.get('/departmentAndEmployee', async (req,res) =>{
    const departments = await getDepartment()
    let department1 = []
    for (const department of departments) {
        const department_1 = {
            departmentid: department.departmentid,
            name: department.name,
            employees: await getEmployeesByDepartmentId(department.departmentid),
            total_employee: await countEmployeeByDepartmentId(department.departmentid),
            total_salary: await countEmployeeSalaryByDepartmentId(department.departmentid),
        }
        department1.push(department_1)
    }
    const result1 = {
        data: department1,
        unit: department1.length
    }
    res.send(result1)
})

//post
router.post('/' ,async (req,res) =>{
    const message = await postDepartment(req.body)
    res.send(message)
})

module.exports = router