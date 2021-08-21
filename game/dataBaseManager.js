import mongoose from "mongoose"
import { Models } from "./models/models.js";

export default function DataBaseManager() {

    const uri = "mongodb+srv://lucasmdsm:ha8dy29ud0sad@magicclassroom.o4h1v.mongodb.net/MagicClassroom?retryWrites=true&w=majority";

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected in Data Base")
    });
    
    function Save(type, obj) {
        const model = new Models[type](obj);
        model.save((err, data) => {
            if(err) console.log(err)
            else console.log("Saved")
        })
    }

    return {
        Save
    }
}