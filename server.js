import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const sockets = new Server(httpServer);
app.use(express.static("public"))

sockets.on('connection', (socket) => {
    //Extract the client id
    const playerId = socket.id
    console.log(`Player ${playerId} connected in the server`) 
    
    //Add the client player in hostGame
    game.addPlayer({player:{playerId: playerId}})  
    console.log(`Player ${playerId} added in game`)

    //Emit current game state
    socket.emit('setup', {state: game.state})

    //Listen to every action from teh hostGame and submit to client
    game.subscribe((command) => {
        console.log(`Emmitting ${command.type}`)
        socket.emit(command.type, command)
    })

    //Remove player from the game when disconnected
    socket.on('disconnect', () => {
        game.removePlayer(playerId)
        console.log(`Player ${playerId} disconnected from the server`)
    })

})

httpServer.listen(3000, () => {
    console.log("Server listening on port: 3000")
})   