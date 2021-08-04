import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const httpServer = http.createServer(app)
const sockets = new Server(httpServer);
app.use(express.static("public"))

sockets.on('connection', (socket) => {
})

httpServer.listen(3000, () => {
    console.log("Server listening on port: 3000")
})   