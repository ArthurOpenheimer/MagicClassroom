export default function createGameObject(PIXI, texture, position, animated) {
    let gameObject = {
        body: new PIXI.Container(),
        sprite: new PIXI.Container(),
        boxCollider : null,
    };

    if(animated) {
        gameObject.sprite = new PIXI.AnimatedSprite(texture);
        gameObject.sprite.play();
    }
    else {
        gameObject.sprite = new PIXI.Sprite(texture);
    }
    gameObject.body.addChild(gameObject.sprite)
    gameObject.body.x = position.x;
    gameObject.body.y = position.y;
    
    return gameObject;
}