export default function createAbstractPlayer(playerId){

    let player = {
        id: playerId,
        name: null,
        spriteId: null,
        x: 0,
        y: 0,
        input: {
            x: 0,
            y: 0,
        },
        velocity: 0,
        setPosition(position) {
            this.x = position.x;
            this.y = position.y;
        }
    };

    return player;
}