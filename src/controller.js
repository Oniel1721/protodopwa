const fs = require('fs')
const path = require('path')


const getTasks = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname,'./database.json')).toString())
}

const updateTasks = (tasks)=>{
    fs.writeFileSync(path.join(__dirname,'./database.json'), JSON.stringify(tasks))
}

const addTask = (task)=>{
    let database = getTasks()
    database[`task${task.index}`]=task
    updateTasks(database)
}

const deleteTask = (id)=>{
    let database = getTasks()
    delete database[id]
    updateTasks(database)
}

const putTask = (id)=>{
    let database = getTasks()
    if(!database[id].statusX){
        database[id].statusX = "active"
        database[id].statusO = ""
    }
    else{
        database[id].statusX = ""
        database[id].statusO = "active"  
    }
    updateTasks(database)
}

const socketConnection = (io)=>{
    io.on('connection', (socket) =>{
        console.log('new user')
        socket.on('notify', ()=>{
            console.log('new notify');
            socket.broadcast.emit('notification', getTasks())
        })
    });
}

module.exports = {
    getTasks,
    addTask,
    deleteTask,
    putTask,
    socketConnection
}