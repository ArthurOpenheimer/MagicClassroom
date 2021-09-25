import createPlayer from "./player.js";
import createKeyListner from "./keyboard-listner.js";
import createChat from "./chat.js";

export default function createScene(htmlDOM, PIXI) {
    let left, up, down, right;
    let observers = [];
    let app;
    let currentPlayerId;
    let sheet;
    let chat;
    let state = {
        players: {},
    }
    let map = [];
    let layers = {
        players: new PIXI.Container(),
        background: new PIXI.Container(),
        objects: new PIXI.Container(),
        UI: new PIXI.Container(),
    }
    let layerManager = new PIXI.Container();

    const loader = PIXI.Loader.shared;
    const ticker = PIXI.Ticker.shared;

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
        PIXI.settings.SORTABLE_CHILDREN = true;

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
        app.stage.SORTABLE_CHILDREN = true;

        layerManager.addChild(layers.background);
        layerManager.addChild(layers.objects);
        layerManager.addChild(layers.players);
        layerManager.addChild(layers.UI);
        layers.background.zIndex = -1;
        layers.objects.zIndex = 0;
        layers.players.zIndex = 1;
        layers.UI.zIndex = 2;
        app.stage.addChild(layerManager);



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
        
        addOnStage(chat.body, "UI")
        constructMap(/* receipe */);
    }

    function constructMap(){
        let fountainAnimation = new PIXI.AnimatedSprite(sheet.animations["fountain"]);
        fountainAnimation.x = 1200;
        fountainAnimation.y = 400;
        fountainAnimation.animationSpeed = 0.2;
        fountainAnimation.scale.set(8,8);
        fountainAnimation.play();
        addOnStage(fountainAnimation, "objects");
        
        let shop = new PIXI.Sprite(sheet.textures["shop.png"]);
        shop.x = 300;
        shop.y = 100;
        shop.scale.set(7,7);
        addOnStage(shop, "objects");

        let missionBoard = new PIXI.Sprite(sheet.textures["mission_board.png"]);
        missionBoard.x = 680;
        missionBoard.y = 250;
        missionBoard.scale.set(3,3);
        addOnStage(missionBoard, "objects"); 

        let bench = new PIXI.Sprite(sheet.textures["bench.png"]);
        bench.x = 710;
        bench.y = 600;
        bench.scale.set(3,3);
        addOnStage(bench, "objects");   
        
        
        let tables = new PIXI.Sprite(sheet.textures["tables.png"]);
        tables.x = 630;
        tables.y = 600;
        tables.scale.set(4,4);
        addOnStage(tables, "objects"); 

        let grass = new PIXI.TilingSprite(
            sheet.textures["grass_floor1.png"],
            1000,
            1000
        );
        grass.x = 0;
        grass.y = 0;
        grass.anchor.set(0)
        grass.scale.set(2,2);
        addOnStage(grass, "background")

    
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
        player.body.zIndex = player.body.y/10;
        addOnStage(player.body, "players");
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
        const position = movement.position
      
        player.input = input;
        player.setAnimation()
        player.setPosition(position);
    }

    function addOnStage(object, layer){
        if(!layer){
            layer = "objects";
        }
        layers[layer].addChild(object)
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