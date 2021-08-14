export default function createPlayer(playerId, notifyAll, PIXI, sheet) {

    let player = {
        spriteContainer: null,
        body: null,
        currentAnimation: null,
        animations: {
            idle: {
                up: null,
                right: null,
                down: null,
                left: null
            },
            walk: {
                up: null,
                right: null,
                down: null,
                left: null
            }
        },
        _facing: null,
        spriteId: null,
        id: playerId,
        velocity: 5,
        input: {
            x: 0,
            y: 0,
        },
        
        move(delta) {
            let diagonalAjust = 1;
            if(this.input.x !=   0 && this.input.y != 0){
                diagonalAjust = (Math.sqrt(2)/2);
            }
            this.body.x += this.input.x * this.velocity * delta * diagonalAjust;
            this.body.y += this.input.y * this.velocity * delta * diagonalAjust;
        },

        setAnimation() {
            let newAnimation;
            if(this.input.x == 0) {
                newAnimation = this.animations.idle[this._facing];
                
            }
            else{
                newAnimation = this.animations.walk[this._facing];
            }

            if(!newAnimation || newAnimation == this.currentAnimation) return

            if(this.currentAnimation) {
                this.spriteContainer.removeChild(this.currentAnimation);
                this.currentAnimation.stop();   
            } 

            newAnimation.gotoAndPlay(1);
            newAnimation.animationSpeed = 0.1;
            this.spriteContainer.addChild(newAnimation);

            this.currentAnimation = newAnimation;
        },

        setPosition(position) {
            if(!position.x && !position.y) return 

            this.body.x = position.x;
            this.body.y = position.y;
        },

        setSprite(spriteId) {
            this.spriteId = spriteId;
        },

        setNickname(nick){
            let nickname = new PIXI.Text(`${nick}`,{fontFamily : 'Arial', fontSize: 15, fill : 0x000000, align : 'center'});
            nickname.y -= 25;
            nickname.x -= nickname.width/2 - 48;
            player.body.addChild(nickname);
        },
        
        setFacing(direction) {
            this._facing = direction;
            this.setAnimation();
        },

        setInputX(x){
            if(x == this.input.x) return;
            this.input.x = x;

            if(x > 0) this.setFacing("right");
            else if(x < 0) this.setFacing("left");
            //Set idle animation
            else this.setAnimation()

            notifyAll({
                type: 'move-player',
                input: this.input,
                position: this.getPosition(),
                facing: this.getFacing(),
                id: this.id,
            });
        },

        setInputY(y){
            if(y == this.input.y) return;
            this.input.y = y;
            
            if(y > 0) this.setFacing("down");
            else if(y < 0) this.setFacing("up");
            //Set idle animation
            else this.setAnimation()

            notifyAll({
                type: 'move-player',
                input: this.input,
                facing: this.getFacing(),
                position: this.getPosition(),
                id: this.id,
            });
        },

        getFacing() {
            return this._facing;
        },

        getPosition() {
            return {
                x: this.body.x,
                y: this.body.y,
            };
        },

        onCollisionEnter(){
            //Do something
        },

        loop(delta){
            this.move(delta);
            //checkCollision();
        },
    };      

    function setConfig() {
        player.animations.idle.down = new PIXI.AnimatedSprite(sheet.animations["student01IdleDown"]);
        player.animations.idle.right = new PIXI.AnimatedSprite(sheet.animations["student01IdleRight"]);
        player.animations.idle.left = new PIXI.AnimatedSprite(sheet.animations["student01IdleLeft"]);
        player.animations.walk.right = new PIXI.AnimatedSprite(sheet.animations["student01WalkingRight"]);
        player.animations.walk.left = new PIXI.AnimatedSprite(sheet.animations["student01WalkingLeft"]);

        
        player.body = new PIXI.Container();
        player.spriteContainer = new PIXI.Container();
        player.spriteContainer.scale.set(3,3)

        player.body.addChild(player.spriteContainer);
        player.setNickname(player.id)
        player.setFacing("down")
    }

    setConfig()
    return player;
}