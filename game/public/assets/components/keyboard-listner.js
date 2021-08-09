export default function createKeyboardListner(document) {
    const state = {
        observers: [],
        objectId: null
    }

    function registerObjectId(id) {
        state.objectId = id
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
            type: 'move-object',
            eventType: 'keydown',
            objectId: state.objectId,
            keyPressed: keyPressed
        }

        notifyAll(command)
    })

    document.addEventListener('keyup', (event) => {
        const keyPressed = event.key
        const command = {
            type: 'move-object',
            eventType: 'keyup',
            objectId: state.objectId,
            keyPressed: keyPressed
        }

        notifyAll(command)
    })

    return{
        subscribe, 
        registerObjectId
    }
}