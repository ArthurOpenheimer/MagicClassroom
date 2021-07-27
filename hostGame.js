export default function createGame() {
    const state = {
        players: []
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const spriteId = 'spriteId' in command ? command.spriteId : "warrior"
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random () * 100) 
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random () * 100)

        const player = {
            playerId: playerId,
            spriteId: spriteId,
            position: {
                x: playerX,
                y: playerY
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
                this.position.x += this.input.x * this.velocity.x * delta
                this.position.y += this.input.y * this.velocity.y * delta
            },
            setPosition(position){
                this.position.x = position.x
                this.position.y = position.y
            }
        }

        state.players.push(player)
    }

    return {
        state,
        addPlayer
    }
}