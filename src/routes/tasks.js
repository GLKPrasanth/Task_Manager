const express = require('express')
const taskRoutes = express.Router()
const tasksInfo = require('../tasks.json')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const validator = require('../helpers/validator')

taskRoutes.use(bodyParser.urlencoded({extended: false}))
taskRoutes.use(bodyParser.json())

taskRoutes.get('/', (req, res) => {
    res.send(tasksInfo)
})

taskRoutes.get('/:taskId', (req, res) => {
    let taskId = req.params.taskId
    let taskDetailsFromId = tasksInfo.tasks.filter(task => task.taskId == taskId)
    console.log(`taskDetails From Id ${JSON.stringify(taskDetailsFromId)}`)
    if (taskDetailsFromId.length < 1) {
        res.status(400).send("Please provide a valid task Id")
    } else {
        res.status(200).send(taskDetailsFromId)
    }
})

taskRoutes.post('/', (req, res) => {
    const taskToCreate = req.body
    let writePath = path.join(__dirname, '..', 'tasks.json')

    let createValidationResponse = validator.validateCreateTaskInfo(taskToCreate, tasksInfo)

    if (createValidationResponse.isCorrectData) {
        let tasksModified = tasksInfo
        tasksModified.tasks.push(taskToCreate)
        fs.writeFileSync(writePath, JSON.stringify(tasksModified), {encoding: 'utf-8', flag: 'w'})
        res.status(200).send("Task created successfully")
    } else {
        res.status(500).send(createValidationResponse.message)
    }
})

taskRoutes.put('/:taskId', (req, res) => {
    const taskToUpdate = req.body 
    if (taskToUpdate.taskId != req.params.taskId) {
        res.status(400).send("Task Id entered in the body and url are different")
    }
    const writePath = path.join(__dirname, '..', 'tasks.json')

    const updateValidationResponse = validator.validateUpdateTaskInfo(taskToUpdate, tasksInfo)

    if(updateValidationResponse.isCorrectData) {
        let tasksModified = tasksInfo
        indexToDelete = tasksInfo.tasks.indexOf(tasksInfo.tasks.filter((task) => task.taskId == taskToUpdate.taskId)[0])
        tasksModified.tasks.splice(indexToDelete, 1)
        tasksModified.tasks.push(taskToUpdate)
        fs.writeFileSync(writePath, JSON.stringify(tasksModified), {encoding: 'utf-8', flag: 'w'})
        res.status(200).send("Task updated successfully")
    } else {
        res.status(500).send(updateValidationResponse.message)
    }

})

taskRoutes.delete('/:taskId', (req, res) => {
    const taskIdToDelete = req.params.taskId
    const writePath = path.join(__dirname, '..', 'tasks.json')

    const deleteValidationResponse = validator.validateDeleteTaskInfo(taskIdToDelete, tasksInfo)

    if (deleteValidationResponse.isCorrectData) {
        let tasksModified = tasksInfo
        indexToDelete = tasksInfo.tasks.indexOf(tasksInfo.tasks.filter((task) => task.taskId == taskIdToDelete)[0])
        tasksModified.tasks.splice(indexToDelete, 1)
        fs.writeFileSync(writePath, JSON.stringify(tasksModified), {encoding: 'utf-8', flag: 'w'})
        res.status(200).send("Task deleted successfully")
    } else {
        res.status(500).send(deleteValidationResponse.message)
    }
})

module.exports = taskRoutes