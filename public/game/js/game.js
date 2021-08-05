import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
import createNewPlayer from "./player.js"
export default function createGame(document, connectClient) {

    //Observer pattern
    const subject = {
        observers: [],
    }

    function subscribe(observerFunction) {
        subject.observers.push(observerFunction)        
    }

    function notifyAll(command) {
        for(const observerFunction of subject.observers) {
            observerFunction(command)
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
    const client = {
        playerId: null
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
        let newPlayer = createNewPlayer(PIXI, app, command, texture, notifyAll)
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

    //Send the position of the current player to serve, fixing positions distortions 
    const sendPosition = setInterval(() => {
        notifyAll({
            type: 'set-position',
            id: client.playerId,
            x: state.players[client.playerId].sprite.x,
            y: state.players[client.playerId].sprite.y
        })
    }, 5000);

    //Receive from server a new position of an object
    function setObjectPosition(command) {
        const objectId = command.id
        state.players[objectId].setPosition({x: command.x, y: command.y})
    }
    //Receive inputs from inuput layer and move this player
    function movePlayer(command) {
        const objectId = command.objectId
        const keyPressed = command.keyPressed
        const eventType = command.eventType
        let movement = {type: command.type}
        const acceptedsKeys ={
            w(){
                movement.direction = 'up'
            },
            d(){
                movement.direction = 'right'
            },
            s(){
                movement.direction = 'down'
            },
            a(){
                movement.direction = 'left'
            }
        }
        const moveFunction = acceptedsKeys[keyPressed]

        //Check if the input was correct (w,d,s,a in this stage)
        if(moveFunction){
            moveFunction()
            movement.value = 0
            //the player is moving 
            if(eventType == 'keydown') {
                movement.value = 1
            }
            //the player isn't moving 
            //save the objectId to posteriorly send to server
            movement.objectId = objectId 
            //new phase of validation
            state.players[objectId].validateInputs(movement)
        }
    }

    //Receive a valiadated movement from server and aply directly to the object
    function moveObject(movement) {
        const objectId = movement.objectId
        console.log(state.players[objectId])
        state.players[objectId].setInputs(movement)
    }
    
    return{
        state,
        movePlayer,
        moveObject,
        addPlayer,
        removePlayer,
        setup,
        setState,
        subscribe,
        client,
        setObjectPosition
    }
}