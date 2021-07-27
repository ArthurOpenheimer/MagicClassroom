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

    game.addPlayer({playerId: playerId})

    socket.emit('setup', {state: game.state})
    
    socket.on('disconnect', () => {
        //remove player from game here
        console.log(`Player ${playerId} disconnected from the server`)
    })

})


httpServer.listen(3000, () => {
    console.log("Server listening on port: 3000")
})   