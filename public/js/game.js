import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
import createNewPlayer from "./player.js"
export default function createGame(document, connectClient) {
    const loader = PIXI.Loader.shared
    const Sprite = PIXI.Sprite
    const resources = PIXI.Loader.resources
    const app = new PIXI.Application()
    let textures = {}

    const state = {
        players: {},
    }

    createViewRender(document, app)
    createGameLoader(loader, Sprite, setup, connectClient)

    function setState(newState) {
        setPlayers(newState.players)
    }

    function setPlayers(players) {
        for(const player of players) {
            if(player.textureSetted) return
            addPlayer({
                id: player.id,
                textureId: player.textureId,
                x:  player.position.x,
                y: player.position.y
            })
        }
    }

    function addPlayer(command) {
        const texture = textures[command.textureId]
        let newPlayer = createNewPlayer(PIXI, app, command, texture)
        state.players[command.id] = newPlayer
    }

    function removePlayer(command) {
        const playerId = command.playerId
        app.ticker.remove(state.players[playerId].move(), this)
        delete state.players[playerId]
    }
    
    //Configurate the game setup
    function setup(loadTextures) {
        textures = loadTextures
    }   

    function moveObject(command) {
        const id = command.objectId
        console.log(state.players)
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