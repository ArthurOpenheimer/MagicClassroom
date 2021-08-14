import createAbstractPlayer from "./abstractPlayer.js";
export default function createAbstractScene(){
    let observers = [];
    let _state = {
        players: {},
    }
    
    function getState(){
        return _state;
    }

    function addPlayer(playerId){
        const player = createAbstractPlayer(playerId);
        player.spriteId = "student01";
        player.setPosition({
            x: Math.floor(Math.random() * 400 + 100),
            y: Math.floor(Math.random() * 400 + 100),
        });
        player.velocity = 5;

        _state.players[playerId] = player;
        notifyAll({type: 'add-player', player: player,});
    }

    function removePlayer(playerId) {
        const players = _state.players;
        delete players[playerId];
        
        notifyAll({
            type:'remove-player',
            id: playerId,
        });
    }   

    function movePlayer(movement) {
        notifyAll(movement);
        const player = _state.players[movement.id];
        player.x = movement.position.x;
        player.y = movement.position.y;
        player.input = movement.input;
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        if(!observers) return;

        for (const observerFunction of observers) {
            observerFunction(command);
        };
    }

    return{
        getState,
        addPlayer,
        removePlayer,
        movePlayer,
        subscribe,
    };  
}