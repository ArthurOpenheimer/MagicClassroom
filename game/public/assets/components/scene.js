import createPlayer from "./player.js";
import createKeyListner from "./keyboard-listner.js";
import createChat from "./chat.js";

export default function createScene(htmlDOM, PIXI) {
    let left, up, down, right;
    let observers = [];
    let app;
    let sheet;
    let chat;
    let state = {
        players: {},
    }
    const loader = PIXI.Loader.shared;
    const ticker = PIXI.Ticker.shared;
    let currentPlayerId;

    function init(element){
        app = new PIXI.Application({
            view: element,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: 1,
            resizeTo: window,
            autoResize: true
        });

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.ROUND_PIXELS = true;

        loadAssets();
    }

    function loadAssets(){
        
        loader.add("assets/sprites/spriteSheet.json");

        loader.load((loader, resources) => {
            sheet = resources["assets/sprites/spriteSheet.json"].spritesheet;
            notifyAll({
                type: 'client-ready'
            });
        });

        loader.onProgress.add((loader, resource) => {
            console.log(`Loading... ${loader.progress}%`);
            console.log(`Resource: ${resource.name}`);
        });

        loader.onError.add((loader, resource) => {
            console.log(`An error ocurred when loading, ${resource.name}`)
        });

    }

    function setup(clientId, newState){ 
        currentPlayerId = clientId;
        setState(newState);
        subscribeKeys();
        
        chat = createChat(PIXI, app, (message) =>{
            notifyAll({
                type: 'chat-message',
                id: clientId,
                text: message,
            })
        });
 
        chat.onFocus(() => {
            unsubscribeKeys();
        })
        
        chat.onBlur(() => {
            subscribeKeys();
        })
        
        addOnStage(chat.body)
    }

    function receiveChatMessage(msg){
        chat.receiveMessage(msg);
    }

    function setState(newState){
        const players = newState.players;

        for(const player in players) {
            addPlayer(players[player]);
        }
    }

    function addPlayer(newPlayer){
        const player = createPlayer(newPlayer.id, notifyAll, PIXI, sheet);

        player.spriteId = newPlayer.spriteId;
        player.velocity = newPlayer.velocity;
        
        player.setPosition({x: newPlayer.x, y: newPlayer.y});
        ticker.add(delta => player.loop(delta));

        addOnStage(player.body);
        state.players[player.id] = player;
    }

    function removePlayer(playerId){
        const player = state.players[playerId];
        ticker.remove(player.loop());
        delete state.players[playerId];
    }

    function subscribeKeys() {
        left = createKeyListner("a"),
        up = createKeyListner("w" ),
        right = createKeyListner("d"),
        down = createKeyListner("s");
        
        setKeyInputs();
    }

    function unsubscribeKeys(){
        left.unsubscribe();
        right.unsubscribe();
        up.unsubscribe();
        down.unsubscribe();
    }

    function setKeyInputs(){  
        const player = state.players[currentPlayerId];

        left.press = () => {
            if(right.isDown) return;
            player.setInputX(-1);
        };

        left.release = () => {
            if(right.isDown) {
                player.setInputX(1);
                return;
            }
            player.setInputX(0)
        };

        right.press = () => {
            if(left.isDown) return;
            player.setInputX(1);
        };

        right.release = () => {
            if(left.isDown) {
                player.setInputX(-1);
                return;
            }
            player.setInputX(0)
        };

        up.press = () => {
            if(down.isDown) return
            player.setInputY(-1)
        };

        up.release = () => {
            if(down.isDown){
                player.setInputY(1)
                return
            }
            player.setInputY(0)
        };

        down.press = () => {
            if(up.isDown) return;
            player.setInputY(1);
        };

        down.release = () => {
            if(up.isDown){
                player.setInputY(-1);
                return;
            }
            player.setInputY(0);
        };
    }

    function moveProxy(movement) {
        const playerId = movement.id;
        const player = state.players[playerId];
        if(!player) return;
        const input = movement.input;
        const facing = movement.facing;
        const position = movement.position
      
        player.input = input;
        player.setFacing(facing);
        player.setPosition(position);
    }

    function addOnStage(object){
        app.stage.addChild(object);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        for(const observerFunction of observers){
            observerFunction(command);
        }
    }

    init(htmlDOM);
    return{
        setup,
        addPlayer,
        removePlayer,
        receiveChatMessage,
        moveProxy,
        subscribe,
    }
}