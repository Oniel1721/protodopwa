const express = require('express')
const Router = express.Router()
const {getTasks,addTask, deleteTask, putTask} = require('../controller.js')


Router.get('/task',(req, res)=>{
    res.json(getTasks())
})

Router.post('/task',(req, res)=>{
    addTask(req.fields)
    res.json(getTasks())
})

Router.delete('/task',(req, res)=>{
    deleteTask(req.fields.id)
    res.json(getTasks())
})

Router.put('/task',(req, res)=>{
    putTask(req.fields.id)
    res.json(getTasks())
})

module.exports = Router