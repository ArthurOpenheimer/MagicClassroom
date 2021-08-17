export default function createChat(PIXI, app, callBack) { 
    const chat = {
        body: new PIXI.Container(),
        messages: new PIXI.Container(),
        width: null,
        height: null,
        x: null,
        y: null,
        color: null,
        _inputField: null,
        _backgroundGraphic: null,

        setSize(size) {
            this.width = size.width;
            this.height = size.height;
        },

        setBackgroundColor(color, alpha) {

            if(this._backgroundGraphic) this._backgroundGraphic.destroy();
            let graphic = new PIXI.Graphics();
            graphic.zIndex = 0;
            graphic.beginFill(color, alpha);
            graphic.drawRect(this.x, this.y - this.width, this.width, this.height);
            graphic.endFill();   
            graphic.interactive = true;

            this.color = color;
            this._backgroundGraphic = graphic;

            this.body.addChild(this._backgroundGraphic);
        },

        sendMessage(){
            const input = this._inputField;
            if(input.text == "") return;
            callBack(input.text);
            input.text = "";
        },

        receiveMessage(msg) {
            const messagesLength = this.messages.children.length;

            const message = new PIXI.Text(msg.text, {fontFamily : 'Arial', fontSize: 12, fill : 0xffffff, align : 'center'});
            this.messages.addChild(message);

            message.x = this._inputField.x + 5;
            message.y = this._inputField.y - 30 - 15*messagesLength;
        },

        onFocus(callBack) {
            this._inputField.on('focus', () => {
                callBack()
                this._backgroundGraphic.alpha += 0.2;
            })
        },

        onBlur(callBack) {
            this._inputField.on('blur', () => {
                callBack()
                this._backgroundGraphic.alpha -= 0.2;
            })
        }
    }   

    function setConfig(){
        chat.body.sortableChildren = true;
        chat.x = 0;
        chat.y = app.renderer.height;
        chat.setSize({width: 300, height: 300});

        chat.setBackgroundColor(0x1C1C1C, 0.6);
        chat._backgroundGraphic.interactive = true;


        const inputField = new PIXI.TextInput({
            input: {
                color: '#ffffff',
                fontSize: '12px',
                padding: '3px',
                width: "" + chat.width - 44 + "px", 
            }, 
            box: {
                fill: 0x4F4F4F, 
                rounded: 16,
            }
        })
        inputField.zIndex = 1;
        inputField.x = chat.x + 20;
        inputField.y = chat.y - 30;
        inputField.placeholder = "Type here";
        inputField.on('keydown', keycode => {
            if(keycode != 13) return;
            inputField.blur();
            chat.sendMessage();
        })
        chat._inputField = inputField;

        chat.body.addChild(inputField);
        chat.body.addChild(chat.messages)
    }

    setConfig();
    return chat;
}