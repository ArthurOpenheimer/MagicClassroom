import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
export default function createGame(document, connectClient) {
    const loader = PIXI.Loader.shared
    const Sprite = PIXI.Sprite
    const resources = PIXI.Loader.resources
    const app = new PIXI.Application()
    let sprites = {}

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
            if(player.sprite) return
            addPlayer({
                playerId: player.playerId,
                spriteId: player.spriteId,
                playerX:  player.position.x,
                playerY: player.position.y
            })
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const spriteId = 'spriteId' in command ? command.spriteId : "warrior"
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random () * 100) 
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random () * 100)
        app.stage.addChild(sprites[spriteId])

        state.players[playerId] = {
            sprite: sprites[spriteId],
            input: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 3,
                y: 3
            },
            move(delta){
                this.sprite.x += this.input.x * this.velocity.x * delta
                this.sprite.y += this.input.y * this.velocity.y * delta
            },
            setPosition(position){
                this.sprite.x = position.x
                this.sprite.y = position.y
            }
        }
        const player = state.players[playerId]
        player.setPosition({x: playerX, y: playerY})
        setPlayerSettings(player)
    }

    function setPlayerSettings(player) {
        app.ticker.add(delta => player.move(delta), this)
        player.velocity.x = 5
        player.velocity.y = 5
    }

    function removePlayer(command) {
        const playerId = command.playerId
        app.ticker.remove(state.players[playerId].move(), this)
        delete state.players[playerId]
    }
    
    //Configurate the game setup
    function setup(loadSprites) {
        sprites = loadSprites
    }

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