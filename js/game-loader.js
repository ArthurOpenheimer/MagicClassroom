export default function createGameLoader(loader, Sprite, setup) {
    let sprites = {}
    loader.add('warrior', 'images/black 1 IDLE_000.png')
    loader.add('warrior2','images/silver 1 IDLE_000.png' )
    
    loader.load((loader, resources) => {
        sprites.warrior = new Sprite(resources.warrior.texture) 
        sprites.warrior2 = new Sprite(resources.warrior2.texture) 
        setup(sprites)
    })

    //Show the load progress
    loader.onProgress.add((loader, resource) => {
        console.log(`Loading resource named: ${resource.name}, url: ${resource.url}`)
        console.log(`Load progress: ${loader.progress}%`)
    })
    loader.onError.add((loader, resource) => {
        console.log(`Resource not found`)
    })
    loader.onLoad.add((loader, resource) => {
        console.log(`${resource.name} loaded with success`)
    })
    loader.onComplete.add((loader, resources) => {
        console.log(`All resources loadeds`)    
    })

}