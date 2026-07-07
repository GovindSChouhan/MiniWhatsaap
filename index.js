const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
//link chat model
const Chat = require("./models/chat.js");
//method Override require karengy :
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));//My views folder is located here."
app.set("view engine", "ejs");//"Whenever I call res.render(), use the EJS template engine."

//to tell ki jo yee public css file hai vo kha say serve kr rhi hai 
app.use(express.static(path.join(__dirname, "public")));

//bahut data aaega Postsayto convert/access/Parsr taht 
app.use(express.urlencoded({extended:true}));

//Mthod override ko use bhi karna padega
app.use(methodOverride("_method"));

main()
    .then((res) => {
        console.log("Connection Successful");
    }).catch((err) => {
        console.log(err);
    });


async function main() {//Server set up cource can refer Documentation
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route : 1st
app.get("/chats",async(req, res) => {
    let chats = await Chat.find();//Chat.find pura deta deta hai 
    console.log(chats);
    res.render("index.ejs", {chats});
});

//New Route : 2nd (FOR CREATE A MESSAGE HERE wala naya page ) 
app.get("/chats/new", (req, res)=> {
    res.render("new.ejs");

})

//Create Route : 3rd To insert Data
app.post("/chats", (req, res) => {
    let{from, to, message} = req.body;
    let newChat = new Chat({
        from: from,
        to : to,
        message:message,
        created_at:new Date()
    });

   newChat.save().then(res => {
    console.log("chat was saved");
   })
   .catch((err) => {
    console.log("err");
   });
    res.redirect("/chats");
});

//Edit Route 
//Asunc as we r not using .then
app.get("/chats/:id/edit", async(req, res) => {
    let {id} = req.params;
   
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})


//Update Route 
app.put("/chats/:id", async(req, res) => {
    let {id} = req.params;//call back mai id actract karengy
    let {message: newMessage} = req.body;//jo naya edit message  hai ussyextract kareny;
    let updatedChat = await Chat.findByIdAndUpdate(id,{message:newMessage},{runValidators:true, new:true}

    );
    console.log(updatedChat);
    res.redirect("/chats");
        
})

//DELETE OR Destroy route
app.delete("/chats/:id", async(req, res) => {
    let{id} = req.params;
   let DeletedChat = await Chat.findByIdAndDelete(id);
    console.log(DeletedChat);
    res.redirect("/chats");
});

//basic chat creation
// let chat1 = new chat({
//     from : "govind",
//     to : "chouhan",
//     message: "send me your exam sheets",
//     created_at : new Date()//yee raandom date time gen karta hai 
// });
// chat1.save()
//     .then((res) =>{
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });



app.get("/", (req, res) =>{
    res.send("root govinnd working");

});

app.listen(8080, () => {
    console.log("server is listning on 8080");
});

