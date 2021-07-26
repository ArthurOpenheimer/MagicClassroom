import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
export default function createGame(document) {

    const loader = PIXI.Loader.shared
    const Sprite = PIXI.Sprite
    const resources = PIXI.Loader.resources
    const app = new PIXI.Application()
  
    createViewRender(document, app)
    createGameLoader(loader, Sprite, setup)

    const gameState = {
        players: {},
        sprites: {}  
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const spriteId = command.spriteId
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random () * 100) 
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random () * 100)
        
        app.stage.addChild(gameState.sprites[spriteId])
    
        gameState.players[playerId] = {
            sprite: gameState.sprites[spriteId],
            input: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 1,
                y: 1
            },
            move(delta){
                this.sprite.x += this.input.x * this.velocity.x * delta
                this.sprite.y += this.input.y * this.velocity.y * delta
            },
            setPosition(position){
                this.sprite.x = position.x
                this.sprite.y = position.y
                console.log(`Setting position X: ${position.x}, position Y: ${position.y}`)
            }
        }

        app.ticker.add(delta => gameState.players[playerId].move(delta), this)
        gameState.players[playerId].setPosition({x: playerX, y: playerY})

    }

    function removePlayer(command) {
        const playerId = command.playerId
        app.ticker.remove(gameState.players[playerId].move(), this)
        delete gameState.players[playerId]
    }
    
    //Configurate the game setup
    function setup(loadSprites) {
        gameState.sprites = loadSprites
        addPlayer({playerId: 'a', spriteId: 'warrior'})

        app.ticker.add(delta => Update(delta))
    }
    
    function Update(delta) {

    }


    function moveObject(command) {

        const object = gameState.players[command.objectId]
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

        moveObject,
        addPlayer,
        removePlayer,
        setup
    }
}