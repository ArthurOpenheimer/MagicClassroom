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
        player.textureId = "student";
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

        for(let i = 0; i < players.length; i++) {
            if(players[i].id == playerId) {
                players.splice(i, 1);
            }
        };

        notifyAll({
            type:'remove-player',
            id: playerId,
        });
    }   

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    };

    function notifyAll(command) {
        if(!observers) return;

        for (const observerFunction of observers) {
            observerFunction(command);
        };
    };

    console.log("Scene created with success!");
    return{
        getState,
        addPlayer,
        removePlayer,
        subscribe,
    };  
}