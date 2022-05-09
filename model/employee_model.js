class employeeModel {
    constructor(map)
    {
        this.employeeid = map.employeeid
        this.name = map.name
        this.lastName = map.lastName
        this.address = map.address
        this.phoneNumber = map.phoneNumber
        this.salary = map.salary
        this.age = map.age
    }
}

module.exports = { employeeModel }