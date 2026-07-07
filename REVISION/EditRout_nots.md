# ✏️ Edit Route (Update Existing Chat)

## Goal
Update an existing chat message stored in MongoDB.

---

# Complete Flow

User clicks **Edit**
        ↓
GET /chats/:id/edit
        ↓
Extract id from URL
        ↓
Find chat using Chat.findById(id)
        ↓
Render edit.ejs with chat data
        ↓
User edits message
        ↓
Submit form
        ↓
POST /chats/:id?_method=PUT
        ↓
method-override converts POST → PUT
        ↓
PUT /chats/:id
        ↓
Extract id & updated message
        ↓
Chat.findByIdAndUpdate()
        ↓
MongoDB updates document
        ↓
Redirect to /chats
        ↓
Updated chat displayed

---

# 1. Edit Route (Display Edit Form)

```js
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;

    let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat });
});
```

### Flow

```
URL
↓
req.params.id
↓
Chat.findById(id)
↓
Gets one document
↓
Send to edit.ejs
```

---

# req.params

Used to extract values from URL.

Example

```
URL

/chats/6872ab123/edit
```

```
req.params

{
    id: "6872ab123"
}
```

```
let { id } = req.params;
```

---

# Chat.findById(id)

Finds ONE document using its MongoDB _id.

Returns

```
{
    _id: ...
    from: ...
    to: ...
    message: ...
}
```

---

# res.render()

```
res.render("edit.ejs", { chat });
```

Means

```
Render edit.ejs
and send

{
    chat : chat
}
```

Inside edit.ejs

```
chat.from
chat.message
chat.to
```

---

# Edit Form

```html
<form method="POST" action="/chats/<%= chat._id %>?_method=PUT">

    <textarea
        name="message"
        rows="15"
        cols="30">
        <%= chat.message %>
    </textarea>

    <button>Edit</button>

</form>
```

---

# Why POST instead of PUT?

HTML Forms support only

✅ GET

✅ POST

NOT

❌ PUT

❌ PATCH

❌ DELETE

So we use

```
method="POST"
```

and

```
?_method=PUT
```

---

# method-override

```
app.use(methodOverride("_method"));
```

When Express sees

```
POST /chats/123?_method=PUT
```

It converts internally to

```
PUT /chats/123
```

---

# Update Route

```js
app.put("/chats/:id", async (req, res) => {

    let { id } = req.params;

    let { message } = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { message },
        {
            runValidators: true,
            new: true
        }
    );

    res.redirect("/chats");
});
```

---

# req.body

Submitted form

```
<textarea name="message">
```

becomes

```
req.body

{
    message : "Updated Message"
}
```

Extract

```
let { message } = req.body;
```

---

# Chat.findByIdAndUpdate()

Syntax

```js
Chat.findByIdAndUpdate(
    id,
    updateObject,
    options
);
```

Example

```js
Chat.findByIdAndUpdate(
    id,
    { message },
    {
        new: true,
        runValidators: true
    }
);
```

---

# Options

## new : true

Returns updated document

Without it

```
Returns old document
```

With it

```
Returns updated document
```

---

## runValidators : true

Runs schema validations while updating.

Example

```
maxLength
required
enum
```

Without it

Some validations may not run during updates.

---

# Redirect

```
res.redirect("/chats");
```

Browser automatically requests

```
GET /chats
```

Updated chats are shown.

---

# Naming Convention (Recommended)

Model

```js
const Chat = require("./models/chat");
```

One document

```js
let chat = await Chat.findById(id);
```

Multiple documents

```js
let chats = await Chat.find();
```

New document

```js
let newChat = new Chat({...});
```

---

# Placement Revision

✅ req.params → URL data

✅ req.body → Form data

✅ Chat.findById() → Get one document

✅ Chat.findByIdAndUpdate() → Update document

✅ res.render() → Send data to EJS

✅ res.redirect() → Browser makes a new request

✅ method-override → Converts POST → PUT

✅ HTML forms support only GET & POST

---

# Quick Interview Revision

```
Edit Button
      ↓
GET /chats/:id/edit
      ↓
Find chat
      ↓
Render edit form
      ↓
User edits message
      ↓
POST + _method=PUT
      ↓
PUT Route
      ↓
findByIdAndUpdate()
      ↓
Redirect
      ↓
Updated chat shown
```
