const express = require('express')
const router = express.Router()
const {
    getEmployeeStartWorks, 
    getEmployeeStartWorksByEmployeeId,
    postEmployee
} = require('../service/employee_service')

// post
router.post('/', async (req, res) => {
    const message = await postEmployee(req.body)
    res.send(message)
    
})

// get
router.get('/', async (req, res) => {
    const employees = await getEmployeeStartWorks()
    const result1 = {
        data: employees,
        unit: employees.length
    }
    res.send(result1)
})

router.get('/getEmployeeById/:id', async (req, res) => {
    const employees = await getEmployeeStartWorksByEmployeeId(req.params.id)
    const result1 = {
        data: employees,
        unit: employees.length
    }
    res.send(result1)
})



module.exports = router