export default function createNewPlayer(PIXI, app, newPlayer, texture) {
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
        }
    }

    function setConfig() {
        player.sprite = new PIXI.Sprite(texture)
        player.textureSetted = true
        app.stage.addChild(player.sprite)
        player.setPosition({
            x: 'x' in newPlayer ? newPlayer.x : Math.floor(Math.random () * 400),
            y: 'y' in newPlayer ? newPlayer.y : Math.floor(Math.random () * 200)
        })
        app.ticker.add(delta => player.move(delta))
    }

    setConfig()
    return player
} 