import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
import createNewPlayer from "./player.js"
export default function createGame(document, connectClient) {

    const subject = {
        observers: [],
    }

    function subscribe(observerFunction) {
        subject.observers.push(observerFunction)        
    }

    function notifyAll(command) {
        for(const observerFunction of subject.observers) {
            observerFunction(command)
            console.log('notifying')
        }
    }

    const loader = PIXI.Loader.shared
    const Sprite = PIXI.Sprite
    const resources = PIXI.Loader.resources
    const app = new PIXI.Application()
    let textures = {}

    //Currrent state of the game
    const state = {
        players: {},
    }
    //Layer responsable for the apresantation of the game
    createViewRender(document, app)
    //Load all textures
    createGameLoader(loader, Sprite, setup, connectClient)

    //When connect in the server, this client receice the state of the game
    function setState(newState) {
        setPlayers(newState.players)
    }

    //Create the players from the new state received, if the palyer isn't already created
    function setPlayers(players) {
        for(const player of players) {
            if(player.textureSetted) return
            addPlayer({
                id: player.id,
                textureId: player.textureId,
                x:  player.x,
                y: player.y
            })
        }
    }

    //Receive a receipe of a player and create a new player
    function addPlayer(command) {
        const texture = textures[command.textureId]
        let newPlayer = createNewPlayer(PIXI, app, command, texture)
        state.players[command.id] = newPlayer
    }

    //Remove a player from the game
    function removePlayer(command) {
        const playerId = command.id
        app.ticker.remove(state.players[playerId].move(), this)
        delete state.players[playerId]
    }
    
    //Configurate the game load setup
    function setup(loadTextures) {
        textures = loadTextures
    }   

    //Receive inputs from inuput layer and move an object
    function moveObject(command) {
        const objectId = command.objectId
        state.players[objectId].setInputs(command)
    }
    
    return{
        state,
        moveObject,
        addPlayer,
        removePlayer,
        setup,
        setState,
        subscribe
    }
}