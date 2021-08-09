import createPlayer from "./player.js";
export default function createScene(htmlDOM, PIXI) {
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

        loadAssets();
    }

    function loadAssets(){
        loader.add('student', 'assets/sprites/student.png');

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

    function addPlayer(newPlayer){
        const player = createPlayer(newPlayer);

        player.sprite = new PIXI.Sprite(textures[newPlayer.textureId]);
        player.setPosition({x: newPlayer.x, y: newPlayer.y});
        addOnStage(player.sprite);
        ticker.add(delta => player.loop(delta));

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

    function setup(){ 
        console.log("Nice studying, have fun :D")
    }

    start(htmlDOM);

    return{
        state,
        addPlayer,
    };
}