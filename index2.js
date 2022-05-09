const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')


const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pilotproject'
})

connect.connect()

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/project', async (req, res) => {

    const projects3 = await getProjects()
    let project1 = []
    for (const project of projects3){
        const project_1 = {
            projectId: project.projectId,
            name: project.name,
            dates: project.dates,
            budgets: project.budgets
        }
        project1.push(project_1)
    }
    const result1 = {
        data: project1,        
        unit: project1.length
    }
    res.send(result1)
})

app.get('/project&maneger', async (req, res) => {

    const projects2 = await getProjects()
    let project_maneger1 = []
    for (const project of projects2){
        const maneger = await getManegerById(project.manegerId)
        const project_maneger2 = {
            projectId: project.projectId,
            name: project.name,
            dates: project.dates,
            budgets: project.budgets,
            maneger: maneger
        }
        project_maneger1.push(project_maneger2)
    }
    const result2 = {
        data: project_maneger1,
        unit: project_maneger1.length
    }

    res.send(result2)
})

app.get('/project&tools', async (req, res) => {

    const projects = await getProjects()
    let project_tools = []
    for (const project of projects) {
        const tools = await getProjectTools(project.projectId)
        const project_tool = {
            projectId: project.projectId,
            name: project.name,
            dates: project.dates,
            budgets: project.budgets,
            tools: tools,
            tools_unit: tools.length
        }
        project_tools.push(project_tool)
    }
    const result = {
        data: project_tools,
        unit: project_tools.length
    }
    res.send(result)
})

async function getProjects() {
    return new Promise( resolve => {
        const get_project = 'select * from project'
        connect.query(get_project, (err, project, _) => {
            resolve(project)
        })
    })
}

async function getProjectManeger(manegerId) {
    return new Promise( resolve => {
        const get_project_manerger = `
        select
        maneger.manegerId,
        maneger.name,
        maneger.lastName,
        maneger.salary
        from maneger
        join project
        on maneger.manegerId = project.manegerId
        `

        connect.query(get_project_manerger + `where manegerId = ${manegerId}`,(err, maneger, _) => {
            resolve(maneger)
        })
    })
}


async function getProjectTools(projectId) {
    return new Promise( resolve => {
        const get_project_tool = `
        select
        tools.toolsId,
        tools.toolsName,
        tools.color
        from tools 
        join projecttools
        on tools.toolsId = projecttools.toolsId
        `
        connect.query(get_project_tool + `where projectId = ${projectId}`, (err, tools, _) => {
            resolve(tools)
        })
    })
}

async function getManegerById(manegerId) {
    return new Promise( resolve => {
        const get_maneger = `select * from maneger where manegerId = ${manegerId}`
        connect.query(get_maneger, (err, maneger, _) => {
            resolve(maneger)
        })
    })
}


app.listen(3000, _ => {
    console.log('server is running at port 3000')
})