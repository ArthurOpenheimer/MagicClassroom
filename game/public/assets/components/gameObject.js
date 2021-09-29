export default function createGameObject(PIXI, texture, position, animated) {
    let gameObject;
    if(animated) {
        gameObject = new PIXI.AnimateSprite(texture);
        gameObject.play();
    }
    else {
        gameObject = new PIXI.Sprite(texture);
    }

    gameObject.x = position.x;
    gameObject.y = position.x;
    
    return gameObject;
}