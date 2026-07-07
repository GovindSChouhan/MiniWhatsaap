const mongoose = require("mongoose");


//Define basic Schema 
const chatSchema = new mongoose.Schema({
    from:{
        type : String,
        required: true
    },
    to:{
        type:String,
        required: true
    },
    message:{
        type:String,
        maxLength:1000
    },
    created_at:{
        type: Date,
        required:true,
    }
});


//step2 Create a Model chat in db it become chats
const  chat = mongoose.model("chat", chatSchema);
module.exports = chat;
