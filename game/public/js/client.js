import createScene from "../assets/components/scene.js";

function main() {
    const HTML_DOM = document.getElementById("game");
    let scene = createScene(HTML_DOM, PIXI);
    connect(scene)
}

function connect(scene) {
    var socket = io();

    socket.on('connect', () => {
        console.log(`Connected in server with id: ${socket.id}`)

        //Listening scene actions
        scene.subscribe((command) => {
            socket.emit(command.type, command);
        });
    });

    socket.on('setup', (command) => {
        const gameState = command.state
        
        scene.setup(socket.id, gameState);
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

    socket.on('chat-message', (command) => {
        scene.receiveChatMessage(command);
    })

}

main();