import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
import createNewPlayer from "./player.js"
export default function createGame(document, connectClient) {
    
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
    function addPlayer(newPlayer) {
        const texture = textures[newPlayer.textureId]
        let newPlayer = createNewPlayer(PIXI, app, newPlayer, texture)
        state.players[newPlayer.id] = newPlayer
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
        const id = command.objectId
        const object = state.players[id]
        if(!object){
            console.log("Object not found")
            return
        }
        const type = command.type
        const keyPressed = command.keyPressed

        const acceptedMoves = {
            w(object){
                object.input.y = -1
            },
            d(object){
                object.input.x = 1
            },
            s(object){
                object.input.y = 1
            },
            a(object){
                object.input.x = -1
            }
        }

        const acceptedStopMoves = {
            w(object){
                object.input.y = 0
            },
            d(object){
                object.input.x = 0
            },
            s(object){
                object.input.y = 0
            },
            a(object){
                object.input.x = 0
            }
        }

        let moveFunction = null
        if(type == "keyup"){
            moveFunction = acceptedStopMoves[keyPressed]
        }
        else{
            moveFunction = acceptedMoves[keyPressed]
        }
        if(moveFunction){
            moveFunction(object)
        }
    }
    
    return{
        state,
        moveObject,
        addPlayer,
        removePlayer,
        setup,
        setState
    }
}