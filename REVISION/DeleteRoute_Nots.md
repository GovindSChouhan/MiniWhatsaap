# 🗑️ Delete Route (Destroy Route)

## Goal

Delete an existing chat from MongoDB.

---

# Complete Flow

User clicks **Delete**
        ↓
POST /chats/:id?_method=DELETE
        ↓
method-override converts POST → DELETE
        ↓
DELETE /chats/:id
        ↓
Extract id using req.params
        ↓
Chat.findByIdAndDelete(id)
        ↓
MongoDB deletes document
        ↓
res.redirect("/chats")
        ↓
Updated chat list displayed

---

# Delete Button (index.ejs)

```html
<form method="POST" action="/chats/<%= chat._id %>?_method=DELETE">
    <button>Delete</button>
</form>
```

---

# Why POST?

HTML Forms support only

✅ GET

✅ POST

Not

❌ PUT

❌ DELETE

Therefore,

```
method="POST"
```

+

```
?_method=DELETE
```

---

# method-override

```js
app.use(methodOverride("_method"));
```

When browser sends

```
POST /chats/6872abc?_method=DELETE
```

method-override converts it to

```
DELETE /chats/6872abc
```

---

# Delete Route

```js
app.delete("/chats/:id", async (req, res) => {

    let { id } = req.params;

    let deletedChat = await Chat.findByIdAndDelete(id);

    console.log(deletedChat);

    res.redirect("/chats");
});
```

---

# req.params

URL

```
/chats/6872abc
```

becomes

```js
req.params

{
    id: "6872abc"
}
```

Extract

```js
let { id } = req.params;
```

---

# Chat.findByIdAndDelete()

Syntax

```js
Chat.findByIdAndDelete(id);
```

Meaning

```
Find document by _id
        ↓
Delete document
        ↓
Return deleted document
```

---

# res.redirect()

```js
res.redirect("/chats");
```

Browser automatically makes

```
GET /chats
```

Updated chat list is displayed.

---

# Common Mistakes

❌ Wrong

```html
action="/chats/<%= chat._id %>/edit"
```

This sends

```
POST /chats/:id/edit
```

Result

```
Cannot POST /chats/:id/edit
```

---

✅ Correct

```html
action="/chats/<%= chat._id %>?_method=DELETE"
```

---

# Placement Revision

✅ Delete Button → POST + ?_method=DELETE

✅ req.params → Get id

✅ Chat.findByIdAndDelete(id)

✅ method-override converts POST → DELETE

✅ res.redirect("/chats") refreshes list

---

# CRUD Summary

## Read

```js
Chat.find()
```

---

## Create

```js
new Chat({...}).save()
```

---

## Update

```js
Chat.findByIdAndUpdate(id, update, options)
```

---

## Delete

```js
Chat.findByIdAndDelete(id)
```

---

# Quick Interview Flow

```
Delete Button
      ↓
POST /chats/:id?_method=DELETE
      ↓
method-override
      ↓
DELETE Route
      ↓
req.params.id
      ↓
Chat.findByIdAndDelete(id)
      ↓
MongoDB deletes document
      ↓
Redirect to /chats
```