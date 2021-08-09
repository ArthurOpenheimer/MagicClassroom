import createScene from "../assets/components/scene.js";
import createKeyboardListner from "../assets/components/keyboard-listner.js";

function main() {
    const HTML_DOM = document.getElementById("game");
    const scene = createScene(HTML_DOM, PIXI);
    connect();
}

function connect() {
    const socket = io();

    socket.on('connect', () => {
        console.log(`Connected in server with id: ${socket.id}`)
    })

}

main();