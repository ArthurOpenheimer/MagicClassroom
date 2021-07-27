export default function createGame() {
    
    const observers = []

    function subscribe(oberserverFunction) {
        observers.push(oberserverFunction)
    }

    function notifyAll(command) {
        for(const observerFunction of observers){
            observerFunction(command)
        }
    }
    const state = {
        players: []
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const textureId = 'textureId' in command ? command.textureId : "warrior"
        const playerX = 'x' in command ? command.playerX : Math.floor(Math.random () * 400) 
        const playerY = 'y' in command ? command.playerY : Math.floor(Math.random () * 400)

        const player = {
            id: playerId,
            textureId: textureId,
            position: {
                x: playerX,
                y: playerY
            },
            textureSetted: false
        }

        state.players.push(player)

        notifyAll({
            type: 'add-player',
            player: player
        })
    }

    function removePlayer(playerId) {
        const players = state.players
        for(let i = 0; i < players.length; i++) {
            if(players[i].id == playerId) {
                players.splice(i, 1);
            }
        }
    }   

    return {
        state,
        addPlayer,
        removePlayer,
        subscribe
    }
}