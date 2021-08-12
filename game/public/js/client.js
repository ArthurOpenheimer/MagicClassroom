import createScene from "../assets/components/scene.js";

function main() {
    const HTML_DOM = document.getElementById("game");
    connect(HTML_DOM);
}

function connect(HTML_DOM) {
    var socket = io();
    let scene;

    socket.on('connect', () => {
        console.log(`Connected in server with id: ${socket.id}`)
    });

    socket.on('setup', (command) => {
        const gameState = command.state
        scene = createScene(HTML_DOM, PIXI, gameState, socket.id); 

        scene.subscribe((command) => {
            socket.emit(command.type, command);
        });
    });

    socket.on('add-player', (command) => {
        const newPlayer = command.player;

        if(newPlayer.id == socket.id) return;

        console.log(`New player connected, id: ${newPlayer.id}`);
        scene.addPlayer(newPlayer);
    });

    socket.on('move-player', (command) => { 
        if(command.id == socket.id) return;
        scene.moveProxy(command);
    })
    

    socket.on('remove-player', (command) => {
        const playerId = command.id;
        
        scene.removePlayer(playerId);
    });

}

main();