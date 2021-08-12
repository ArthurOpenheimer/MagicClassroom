export default function createPlayer(playerId, notifyAll) {

    let player = {
        sprite: null,
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
            this.sprite.x += this.input.x * this.velocity * delta * diagonalAjust;
            this.sprite.y += this.input.y * this.velocity * delta * diagonalAjust;
        },

        setPosition(position) {
            if(!position.x && !position.y) return 

            this.sprite.x = position.x;
            this.sprite.y = position.y;
        },

        setInput(input){
            if(input == this.input) return;
            this.input = input;
            notifyAll({
                type: 'move-player',
                input: this.input,
                position: this.getPosition(),
                id: this.id,
            });
        },

        getPosition() {
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