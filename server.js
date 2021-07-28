import express from "express"
import http from "http"
import { Server } from "socket.io"
import createGame from "./hostGame.js"

const game = createGame();
const app = express()
const httpServer = http.createServer(app)
const sockets = new Server(httpServer);
app.use(express.static("public"))


sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player ${playerId} connected in the server`) 
    game.addPlayer({player:{
        playerId: playerId,
        x:Math.floor(Math.random()* 400), 
        y:Math.floor(Math.random()* 400)
    }})  
    console.log(`Player ${playerId} added in game`)


    socket.emit('setup', {state: game.state})

    game.subscribe((command) => {
        console.log(`Emmitting ${command.type}`)
        socket.emit(command.type, command)
    })

    socket.on('disconnect', () => {
        game.removePlayer(playerId)
        console.log(`Player ${playerId} disconnected from the server`)
    })

})


httpServer.listen(3000, () => {
    console.log("Server listening on port: 3000")
})   