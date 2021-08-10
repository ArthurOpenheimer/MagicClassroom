import express from "express"
import http from "http"
import { Server } from "socket.io"
import createAbstractScene from "./components/abstractScene.js"

const app = express()
const httpServer = http.createServer(app)
const sockets = new Server(httpServer);
app.use(express.static("public"))

const scene = createAbstractScene();

sockets.on('connection', (socket) => {
    const playerId = socket.id;
    console.log(`Player ${playerId} connected in the server`) 

    scene.addPlayer(playerId);

    socket.emit('setup', {state: scene.getState(),});

    socket.on('disconnect', () => {
        //remove player
        console.log(`Player ${playerId} disconnected from the server`)
    })

})

httpServer.listen(3000, () => {
    console.log("Server listening on port: 3000")
})   