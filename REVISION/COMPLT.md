# 🚀 Placement Quick Revision Sheet (Express + MongoDB)
> Goal: Revise in 15–20 minutes before coding/interviews.

---

# 1. Basic Setup

```js
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
...
const methodOverride = require("method-override");

const Chat = require("./models/chat");
```

---

# 2. App Configuration

```js
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
```

Remember

```
views → Where EJS files are stored

view engine → Use EJS

static → CSS, Images, JS

urlencoded → Read form data

methodOverride → Enable PUT & DELETE
```

---

# 3. MongoDB Connection

```js
main()
.then(() => console.log("Connected"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(
        "mongodb://127.0.0.1:27017/whatsapp"
    );
}
```

Remember

```
await waits

.then() runs after success

.catch() handles errors
```

---

# 4. Schema

```js
const chatSchema = new mongoose.Schema({

    from: String,

    to: String,

    message: String,

    created_at: Date

});
```

---

# 5. Model

```js
const Chat = mongoose.model("Chat", chatSchema);
```

Remember

```
Model → Singular

Collection → Plural

Chat

↓

chats
```

---

# 6. Create Document

```js
const newChat = new Chat({

    from,

    to,

    message,

    created_at: new Date()

});

await newChat.save();
```

---

# 7. CRUD Methods

## Read All

```js
Chat.find()
```

---

## Read One

```js
Chat.findById(id)
```

---

## Create

```js
new Chat({...}).save()
```

---

## Update

```js
Chat.findByIdAndUpdate(
    id,
    update,
    {
        runValidators:true,
        new:true
    }
);
```

---

## Delete

```js
Chat.findByIdAndDelete(id)
```

---

# 8. CRUD Routes

## Index

```
GET /chats
```

↓

Show all chats

---

## New

```
GET /chats/new
```

↓

Show form

---

## Create

```
POST /chats
```

↓

Insert into DB

---

## Edit

```
GET /chats/:id/edit
```

↓

Show edit page

---

## Update

```
PUT /chats/:id
```

↓

Update document

---

## Delete

```
DELETE /chats/:id
```

↓

Delete document

---

# 9. req

## req.params

```
URL data

/chats/123

↓

123
```

---

## req.body

```
Form data

<input>

<textarea>

<select>
```

---

## req.query

```
?search=govind
```

---

# 10. Render vs Redirect

Render

```js
res.render("index.ejs",{chats});
```

Meaning

```
Render EJS

↓

HTML

↓

Browser
```

---

Redirect

```js
res.redirect("/chats");
```

Meaning

```
Tell browser

↓

Make another request
```

---

# 11. HTML Form

Show form

```html
<form method="GET">
```

Save data

```html
<form method="POST">
```

---

# 12. method-override

HTML supports only

```
GET

POST
```

Need

```
PUT

DELETE
```

Use

```html
?_method=PUT
```

or

```html
?_method=DELETE
```

---

# 13. EJS

Print Variable

```ejs
<%= chat.message %>
```

Loop

```ejs
<% for(let chat of chats){ %>

<% } %>
```

JS only

```ejs
<% %>
```

Print value

```ejs
<%= %>
```

---

# 14. Async Await

```js
let chats = await Chat.find();
```

Flow

```
Database

↓

Wait

↓

Return Data

↓

Store

↓

Next Line
```

---

# 15. Naming Convention (IMPORTANT)

Model

```js
Chat
```

Single Document

```js
chat
```

Array

```js
chats
```

New Document

```js
newChat
```

---

# 16. Common Errors

❌ Char.find()

✅ Chat.find()

---

❌ req.param

✅ req.params

---

❌ Forget await

↓

Promise returned

---

❌ Forget express.urlencoded()

↓

req.body undefined

---

❌ Forget method-override

↓

Cannot PUT

Cannot DELETE

---

❌ Wrong form action

```
/edit
```

instead of

```
?_method=DELETE
```

---

❌ Running seed data every time

↓

Duplicate documents

---

# 17. CRUD Flow

INDEX

```
GET

↓

Chat.find()

↓

render()
```

---

CREATE

```
POST

↓

req.body

↓

new Chat()

↓

save()

↓

redirect()
```

---

EDIT

```
GET

↓

findById()

↓

render()
```

---

UPDATE

```
PUT

↓

req.params.id

↓

req.body

↓

findByIdAndUpdate()

↓

redirect()
```

---

DELETE

```
DELETE

↓

req.params.id

↓

findByIdAndDelete()

↓

redirect()
```

---

# ⭐ Interview Checklist

✅ Express Setup

✅ MongoDB Connection

✅ Schema

✅ Model

✅ CRUD

✅ req.params

✅ req.body

✅ req.query

✅ render()

✅ redirect()

✅ async/await

✅ method-override

✅ EJS Loop

✅ Forms

✅ find()

✅ findById()

✅ save()

✅ findByIdAndUpdate()

✅ findByIdAndDelete()

---

# 🧠 One-Line Memory Trick

```
GET    → Show

POST   → Create

PUT    → Update

DELETE → Remove

find()              → All

findById()          → One

save()              → Insert

findByIdAndUpdate() → Modify

findByIdAndDelete() → Remove

render()            → Show EJS

redirect()          → New Request
```
