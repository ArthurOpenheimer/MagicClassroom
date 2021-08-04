export default function createNewPlayer(PIXI, app, newPlayer, texture, notifyAll) {
    const player = {
        id: newPlayer.id,
        sprite: null,
        textureSetted: false,
        movements: {
            up:{
                value: 0,
            },
            right: {
                value: 0,
            },
            down: {
                value: 0,
            },
            left: {
                value: 0,
            },
        },
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
        setPosition(position) {
            this.sprite.x = position.x
            this.sprite.y = position.y
            console.log("Setting position of a player")
        },
        setVelocity(velocity) {
            this.velocity.x = velocity.x
            this.velocity.y = velocity.y
        },
        validateInputs(movement) {
            const direction = movement.direction
            const value = movement.value

            //dont execute the same input, avoiding send useless information to server
            if(value == this.movements[direction].value) return

            notifyAll(movement)
            this.setInputs(movement)
        },
        setInputs(movement){
            const direction = movement.direction
            const value = movement.value
            this.movements[direction].value = value

            //Move the player (need refatoring)
            if(this.movements.up.value == 1 && this.movements.down.value == 1) this.input.y = 0
            else if(this.movements.up.value == 1) this.input.y = -1
            else if(this.movements.down.value == 1) this.input.y = +1
            else this.input.y = 0

            if(this.movements.left.value == 1 && this.movements.right.value == 1) this.input.x = 0
            else if(this.movements.right.value == 1) this.input.x = +1
            else if(this.movements.left.value == 1) this.input.x = -1
            else this.input.x = 0
            console.log("moved")
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