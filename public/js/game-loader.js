export default function createGameLoader(loader, Sprite, setup, connectClient) {
    let sprites = {}
    loader.add('warrior', 'images/black 1 IDLE_000.png')
    loader.add('warrior2','images/silver 1 IDLE_000.png' )
    
    loader.load((loader, resources) => {
        let textures = []
        textures['warrior'] = PIXI.Texture.from('warrior')
        console.log("In load...")
        setup(sprites, textures)
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