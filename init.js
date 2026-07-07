const mongoose = require("mongoose");
const chat = require("./models/chat.js");//link chat model


main()
    .then((res) => {
        console.log("Connection Successful");
    }).catch((err) => {
        console.log(err);
    });


async function main() {//Server set up cource can refer Documentation
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//RANDOM DATA FOR PROJECT 
let allchats = [
    {
        from: "govind",
        to: "chouhan",
        message: "Send me your exam sheets.",
        created_at: new Date(),
    },
    {
        from: "rahul",
        to: "aman",
        message: "Are you coming to college today?",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "neha",
        message: "Can you share the DBMS notes?",
        created_at: new Date(),
    },
    {
        from: "rohit",
        to: "sneha",
        message: "Meeting starts at 5 PM.",
        created_at: new Date(),
    },
    {
        from: "aditya",
        to: "simran",
        message: "Happy Birthday! Have a great day!",
        created_at: new Date(),
    }
];


//model name insertMany
chat.insertMany ([
    {
    from : "govind",
    to : "chouhan",
    message: "send me your exam sheets",
    created_at : new Date()//yee raandom date time gen karta hai
    } 
]);
//nsertMany() is used to insert multiple documents
//  into a MongoDB collection in a single operation.
chat.insertMany(allchats);
    

