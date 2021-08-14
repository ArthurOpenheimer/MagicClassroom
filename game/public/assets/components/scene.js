import createPlayer from "./player.js";
import createKeyListner from "./keyboard-listner.js";

export default function createScene(htmlDOM, PIXI, newState, clientId) {
    let left, up, down, right;
    let observers = [];
    let app;
    let textures = {};
    let state = {
        players: {},
    }
    const loader = PIXI.Loader.shared;
    const ticker = PIXI.Ticker.shared;
    const currentPlayerId = clientId;

    function start(element){
        app = new PIXI.Application({
            view: element,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: 1,
        });
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        loadAssets(setup);
    }

    function loadAssets(setup){
        
        loader.add('student', 'assets/sprites/student_0001_idle_down.png');
        loader.add("assets/sprites/spriteSheet.json");

        loader.load((loader, resources) => {
            textures['student'] = PIXI.Texture.from('student');
            setup();
        });

        loader.onProgress.add((loader, resource) => {
            console.log(`Loading... ${loader.progress}%`)
        });

        loader.onError.add((loader, resource) => {
            console.log(`An error ocurred when loading, ${resource}`)
        });

    }

    function setup(){ 
        setState(newState);
        setKeyInputs();
    }

    function setState(newState){
        const players = newState.players;
        for(const player in players) {
            addPlayer(players[player]);
        }
    }

    function addPlayer(newPlayer){
        const player = createPlayer(newPlayer.id, notifyAll);

        player.sprite = new PIXI.Sprite(textures[newPlayer.textureId]);
        player.sprite.scale.set(3,3);

        player.velocity = newPlayer.velocity;
        
        player.setPosition({x: newPlayer.x, y: newPlayer.y});
        ticker.add(delta => player.loop(delta));

        addOnStage(player.sprite);
        state.players[player.id] = player;
    }

    function removePlayer(playerId){
        const player = state.players[playerId];
        ticker.remove(player.loop());

        delete state.players[playerId];
    }

    function setKeyInputs(){  
        const player = state.players[currentPlayerId];
        left = createKeyListner("a"),
        up = createKeyListner("w" ),
        right = createKeyListner("d"),
        down = createKeyListner("s");

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
        const input = movement.input;
        const player = state.players[playerId];
        if(!player) return;

        player.setPosition(movement.position);
        player.input = input;
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

    start(htmlDOM);

    return{
        state,
        addPlayer,
        removePlayer,
        moveProxy,
        subscribe,
    }
}