export default function createGameLoader(loader, Sprite, setup, connectClient) {
    let sprites = {}
    loader.add('warrior', 'images/black 1 IDLE_000.png')
    loader.add('warrior2','images/silver 1 IDLE_000.png' )
    
    loader.load((loader, resources) => {
        sprites.warrior = new Sprite(resources.warrior.texture) 
        sprites.warrior.scale.set(0.5, 0.5)
        sprites.warrior2 = new Sprite(resources.warrior2.texture) 
        sprites.warrior3 = new Sprite(resources.warrior2.texture) 
        console.log("In load...")
        setup(sprites)
    })

    //Show the load progress
    loader.onProgress.add((loader, resource) => {
    })
    loader.onError.add((loader, resource) => {
    })
    loader.onLoad.add((loader, resource) => {
    })
    loader.onComplete.add((loader, resources) => {
        connectClient()
    })

}