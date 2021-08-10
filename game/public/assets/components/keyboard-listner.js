export default function createKeyboardListner(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerObjectId(id) {
        state.playerId = id
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command){
        if(state.observers){
            for(const observerFunction of state.observers) {
                observerFunction(command)
            }
        }
    }

    document.addEventListener('keydown', (event) => {
        const keyPressed = event.key
        const command = {
            type: 'move-player',
            value: true,
            playerId: state.playerId,
            keyPressed: keyPressed
        }

        notifyAll(command)
    })

    document.addEventListener('keyup', (event) => {
        const keyPressed = event.key
        const command = {
            type: 'move-player',
            value: false,
            playerId: state.playerId,
            keyPressed: keyPressed
        }

        notifyAll(command)
    })

    return{
        subscribe, 
        registerObjectId
    }
}