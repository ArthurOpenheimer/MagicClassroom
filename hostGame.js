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
        const newPlayer = command.player
        const playerId = newPlayer.playerId
        const textureId = 'textureId' in newPlayer ? newPlayer.textureId : "warrior"
        const playerX = 'x' in newPlayer ? newPlayer.x : 100
        const playerY = 'y' in newPlayer ? newPlayer.y : 100

        const player = {
            id: playerId,
            textureId: textureId,
            x:playerX,
            y:playerY,
            textureSetted: false
        }

        state.players.push(player)

        notifyAll({
            type: 'add-player',
            player: player
        })
    }

    function removePlayer(playerId) {
        notifyAll({
            type:'remove-player',
            id: playerId
        })
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