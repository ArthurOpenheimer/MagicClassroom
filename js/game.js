import createViewRender from "./view-render.js"
import createGameLoader from "./game-loader.js"
export default function createGame(keyboardListner) {
    let sprites = {}
    const loader = PIXI.Loader.shared
    const Sprite = PIXI.Sprite
    const resources = PIXI.Loader.resources
    const app = new PIXI.Application()
  
    createViewRender(document, app)
    createGameLoader(loader, Sprite, setup)

    const gameState = {
            
    }
    
    //Configurate the game setup
    function setup(loadSprites) {
    sprites = loadSprites
    const darkWarrior = sprites.warrior
    const silverWarrior = sprites.warrior2
    darkWarrior.scale.set(0.5, 0.5)
    sprites.warrior.velocityX = 0
    sprites.warrior.velocityY = 0
    
    app.stage.addChild(darkWarrior);
    app.ticker.add(delta => Update(delta))
    }
    
    function Update(delta) {
       sprites.warrior.x +=  sprites.warrior.velocityX 
       sprites.warrior.y +=  sprites.warrior.velocityY 
    }


    function moveObject(command) {
        const object = sprites[command.objectId]
        const type = command.type
        const keyPressed = command.keyPressed
        let moving = 0
        const acceptedMoves = {
            w(object, moving){
                sprites.warrior.velocityY = -1 * moving
            },
            d(object){
                sprites.warrior.velocityX = 1 * moving
            },
            s(object){
                sprites.warrior.velocityY = 1 * moving
            },
            a(object){
                sprites.warrior.velocityX = -1 * moving
            }
        }
        const moveFunction = acceptedMoves[keyPressed]
       
        if(moveFunction){
            if(type == 'keyup'){
                moving = 0
            }
            else {
                moving = 1
            }
            moveFunction(object, moving)
        }
    }
    
    
    return{
        moveObject,
        setup
    }
}