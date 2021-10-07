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
            x: 50,
            y: 400,
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
    
    
    function sendChatMessage(command) {
        notifyAll(command);
        console.log(command.text)
    }

    function movePlayer(movement) {
        const player = _state.players[movement.id];
        if(!player) return
        notifyAll(movement);
        player.x = movement.position.x;
        player.y = movement.position.y;
        player.input = movement.input;
    }

    function collisionManager(collision) {
        notifyAll(collision);
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
        sendChatMessage,
        addPlayer,
        removePlayer,
        movePlayer,
        collisionManager,
        subscribe,
    };  
}
