export default function createNewPlayer(PIXI, app, newPlayer, texture) {
    const subject = {
        observers: [],
    }
    
    const player = {
        id: newPlayer.id,
        sprite: null,
        textureSetted: false,
        input: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 3,
            y: 3
        },
        subscribe(observerFunction) {
        subject.observers.push(observerFunction)        
    },
        move(delta){
            this.sprite.x += this.input.x * this.velocity.x * delta
            this.sprite.y += this.input.y * this.velocity.y * delta
        },
        setPosition(position) {
            this.sprite.x = position.x
            this.sprite.y = position.y
        },
        setVelocity(velocity) {
            this.velocity.x = velocity.x
            this.velocity.y = velocity.y
        },
        setInputs(command) {
            const type = command.eventType
            const key = command.keyPressed

            if(type == "keydown"){
                if(key == 'w' && this.input.y > -1){
                    this.input.y -= 1
                }
                if(key == 's' && this.input.y < 1){
                    this.input.y += 1
                }
                if(key == 'd' && this.input.x < 1){
                    this.input.x += 1
                }
                if(key == 'a' && this.input.x > -1){
                    this.input.x -= 1
                }
            }

            if(type == "keyup"){
                if(key == 'w'){
                    this.input.y += 1
                }
                if(key == 's'){
                    this.input.y -= 1
                }
                if(key == 'd'){
                    this.input.x -= 1
                }
                if(key == 'a'){
                    this.input.x += 1
                }
            }
        }
    }

    function setConfig() {
        player.sprite = new PIXI.Sprite(texture)
        player.textureSetted = true
        app.stage.addChild(player.sprite)
        player.setPosition({
            x: newPlayer.x,
            y: newPlayer.y
        })
        app.ticker.add(delta => player.move(delta))
    }   
    setConfig()
    return player
} 