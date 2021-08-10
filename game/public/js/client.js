import createScene from "../assets/components/scene.js";
import createKeyboardListner from "../assets/components/keyboard-listner.js";

function main() {
    const HTML_DOM = document.getElementById("game");
    connect(HTML_DOM);
}

function connect(HTML_DOM) {
    const socket = io();
    let scene;
    socket.on('connect', () => {
        console.log(`Connected in server with id: ${socket.id}`)
    });

    socket.on('setup', (command) => {
        const gameState = command.state
        let scene = createScene(HTML_DOM, PIXI, gameState);
    });

}

main();