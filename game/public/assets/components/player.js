export default function createPlayer(playerId) {

    let player = {
        sprite: null,
        id: playerId,
        velocity: 5,
        input: {
            x: 0,
            y: 0
        },
        
        move(delta){
            this.sprite.x += this.input.x * this.velocity * delta;
            this.sprite.y += this.input.y * this.velocity * delta;
        },

        setPosition(position){
            if(!position.x && !position.y) return 

            this.sprite.x = position.x;
            this.sprite.y = position.y;
        },
        
        getPosition(){
            return {
                x: this.sprite.x,
                y: this.sprite.y,
            };
        },

        loop(delta){
            this.move(delta);
            //checkCollision();
        },
    }        

    return player;
}