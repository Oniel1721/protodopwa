const express = require('express')
const http = require('http')
const formidable = require('express-formidable')
const cors = require('cors')
const path = require('path')
// const morgan = require('morgan')
const app = express()
const server = http.Server(app)
// const io = require('socket.io')(server)
const {getTasks} = require('./controller.js')

// const io = socketio.listen(server)

// const {socketConnection} = require('./controller.js')


// console.log(socketio)
app.set('port', process.env.PORT || 3000)
app.use(cors())
// app.use(morgan('dev'))
app.use(formidable())
app.use(express.urlencoded({extended:false}));
app.use(express.json())

app.use(express.static(path.join(__dirname, '../dist')))

// app.use(require('./api/api.js'))

// app.get('*', (req, res)=>{
//   res.redirect('https://' + req.headers.host + req.url);
//   // if(!req.headers.referer.includes('https')){
//   //   console.log('el hijo de puta no tiene https')
//   //   res.redirect('https://facebook.com')
//   // }
//   // console.log('la url', req.url)
// })

app.use('/api' , require('./api/api.js'))

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, '../dist/index.html'),(err)=> {
      if (err) {
        res.status(500).send(err)
      }
    })
})

// console.log(io)
// socketConnection(io)

server.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})