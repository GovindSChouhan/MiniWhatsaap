# ➕ New Route (Display Form)

## Goal

Display a page where the user can write a new chat.

---

# Flow

User clicks **New Chat**
        ↓
GET /chats/new
        ↓
Express matches New Route
        ↓
Render new.ejs
        ↓
Browser displays form
        ↓
User enters details
        ↓
Form submits to Create Route (POST /chats)

---

# Route

```js
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});
```

---

# Why GET?

GET is used to **display a page**, not save data.

Examples

```
GET /chats
```

→ Show all chats

```
GET /chats/new
```

→ Show form

---

# res.render()

```js
res.render("new.ejs");
```

Means

```
Find

views/new.ejs

↓

Convert EJS → HTML

↓

Send HTML to browser
```

No data is passed because the page is initially empty.

---

# new.ejs

```html
<form method="POST" action="/chats">

    <input name="from">

    <textarea name="message"></textarea>

    <input name="to">

    <button>Create Chat</button>

</form>
```

---

# Form Flow

```
User fills form
        ↓
Click Create Chat
        ↓
POST /chats
        ↓
Create Route executes
```

---

# Difference

## New Route

```
GET /chats/new
```

Purpose

```
Show the form
```

---

## Create Route

```
POST /chats
```

Purpose

```
Save data into MongoDB
```

---

# Placement Revision

✅ GET Route → Display form

✅ res.render() → Render new.ejs

✅ No database query required

✅ Form action="/chats"

✅ Form method="POST"

✅ New Route only shows the page

✅ Create Route actually inserts data

---

# Quick Flow

```
New Chat Button
        ↓
GET /chats/new
        ↓
Render new.ejs
        ↓
User fills form
        ↓
POST /chats
        ↓
Create Route
        ↓
MongoDB
```
