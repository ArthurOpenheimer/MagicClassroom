import createPlayer from "./player.js";
export default function createScene(htmlDOM, PIXI, newState) {
    let app;
    let textures = {};
    const loader = PIXI.Loader.shared;
    const ticker = PIXI.Ticker.shared;
    let state = {
        players: {},
    };

    function start(element){
        app = new PIXI.Application({
            view: element,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: 1,
        });

        loadAssets(setup);
    }

    function setup(){ 
        setState(newState);
    }

    function loadAssets(setup){
        loader.add('student', 'assets/sprites/student_0001_idle_down.png');

        loader.load((loader, resources) => {
            textures['student'] = PIXI.Texture.from('student');
            setup();
        })
        loader.onProgress.add((loader, resource) => {
            console.log(`Loading... ${loader.progress}%`)
        })
        loader.onError.add((loader, resource) => {
            console.log(`An error ocurred when loading, ${resource}`)
        })
    }

    function setState(newState){
        const players = newState.players;
        for(const player in players) {
            addPlayer(players[player]);
        };
    }

    function addPlayer(newPlayer){
        const player = createPlayer(newPlayer.id);

        player.sprite = new PIXI.Sprite(textures[newPlayer.textureId]);
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

    function addOnStage(object){
        app.stage.addChild(object);
    }

    start(htmlDOM);

    return{
        state,
        addPlayer,
        removePlayer,
    };
}