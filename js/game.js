import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
export default function createGame() {
    
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

        app.ticker.add(delta => gameState.players[playerId].move(delta))
        gameState.players[playerId].setPosition({x: playerX, y: playerY})

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
        const object = gameState.sprites[command.objectId]
        const type = command.type
        const keyPressed = command.keyPressed
        let moving = 0
        const acceptedMoves = {
            w(object, moving){
                object.inputY = -1
            },
            d(object){
                object.inputX = 1
            },
            s(object){
                object.inputY = 1
            },
            a(object){
                object.inputX = -1
            }
        }
        const moveFunction = acceptedMoves[keyPressed ]
       
        if(moveFunction){
            if(type == 'keyup'){
                
            }
            moveFunction(object, moving)
        }
    }
    
    
    return{
        moveObject,
        setup
    }
}