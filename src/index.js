const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { generateMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getAllUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 4000


io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options})

        if(error){
            return callback(error)
        }

        io.emit('sys-message', generateMessage(user, `${user.name} has joined the chat`))
        io.emit('users-list-updated', {
            users: getAllUsers()
        })     

        callback()
    })

    socket.on("create-message", (message) => {
        const user = getUser(socket.id)        
        io.emit('user-message', generateMessage(user, message))
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.emit('sys-message', generateMessage(user, `${user.name} has left the chat`))
            io.emit('users-list-updated', {
                users: getAllUsers()
            })
        }        
    })
})

// server instead of app
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
