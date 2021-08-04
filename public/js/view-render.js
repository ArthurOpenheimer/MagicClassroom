export default function createViewRender(document, app) {
    app.forceCanvas = true;
    document.body.appendChild(app.view)
    //Change background color
    app.renderer.backgroundColor = 0x061639

    //Resize canvas
    app.renderer.resize(100, 100)

    //Make canvas fill the entire screen
    app.renderer.view.style.position = "absolute"
    app.renderer.view.style.display = "block"
    app.renderer.autoRiseze = true
    app.renderer.resize(window.innerWidth, window.innerHeight)
    window.addEventListener("resize", (event) => { 
        app.renderer.resize(window.innerWidth, window.innerHeight)
    })
}


