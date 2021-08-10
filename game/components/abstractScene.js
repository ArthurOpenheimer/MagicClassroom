import createAbstractPlayer from "./abstractPlayer.js";
export default function createAbstractScene(){
    
    let state = {
        players: {},
    }
    
    function getState(){
        console.log(`Returning state to server.js`);
        return state;
    }

    function addPlayer(playerId){
        const player = createAbstractPlayer(playerId);
        player.textureId = "student";
        player.setPosition({
            x: Math.floor(Math.random() * 400 + 100),
            y: Math.floor(Math.random() * 400 + 100),
        });
        player.velocity = 5;

        state.players[playerId] = player;
        console.log(player);
    }
    
    console.log("Scene created with success!");
    return{
        getState,
        addPlayer,
    };  
}