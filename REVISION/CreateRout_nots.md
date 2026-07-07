# MongoDB + Express Revision Notes (Create Route)

## Flow

```
User fills form
        │
        ▼
GET /chats/new
        │
        ▼
new.ejs (Form)
        │
        ▼
Click "Create Chat"
        │
        ▼
POST /chats
        │
        ▼
req.body receives form data
        │
        ▼
Create new Chat object
        │
        ▼
newChat.save()
        │
        ▼
MongoDB stores document
        │
        ▼
res.redirect("/chats")
        │
        ▼
GET /chats
        │
        ▼
chat.find()
        │
        ▼
Render updated index.ejs
```

---

# 1. New Route (GET)

```javascript
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});
```

### Purpose

- Displays the page containing the form.
- No database operation.
- Only renders the EJS page.

---

# 2. Form (new.ejs)

```html
<form method="POST" action="/chats">
```

### Meaning

- method="POST"
  - Send data to the server.

- action="/chats"
  - Send request to POST /chats route.

Every input having a `name` attribute becomes part of `req.body`.

Example:

```html
<input name="from">
<input name="to">
<textarea name="message"></textarea>
```

becomes

```javascript
req.body = {
    from: "...",
    to: "...",
    message: "..."
}
```

---

# 3. Middleware

```javascript
app.use(express.urlencoded({ extended: true }));
```

### Purpose

Converts form data into JavaScript object.

Without it:

```javascript
req.body
```

is

```javascript
undefined
```

---

# 4. Create Route (POST)

```javascript
app.post("/chats", (req, res) => {

});
```

### Purpose

Handles submitted form data.

Creates a new document in MongoDB.

---

# 5. Destructuring

```javascript
let { from, to, message } = req.body;
```

Instead of

```javascript
req.body.from
req.body.to
req.body.message
```

---

# 6. Create Model Object

```javascript
let newChat = new chat({
    from,
    to,
    message,
    created_at: new Date()
});
```

### Meaning

Creates a JavaScript object according to Chat Schema.

At this point it is **NOT** stored in MongoDB.

---

# 7. Save Document

```javascript
newChat.save();
```

### Purpose

Stores the document inside MongoDB.

Without `save()`

Nothing is inserted.

---

# 8. Redirect

```javascript
res.redirect("/chats");
```

### Purpose

After saving

Browser automatically requests

```
GET /chats
```

so updated chats become visible.

---

# Complete Flow

```
Form
 ↓
POST /chats
 ↓
req.body
 ↓
new chat(...)
 ↓
save()
 ↓
MongoDB
 ↓
redirect
 ↓
GET /chats
 ↓
find()
 ↓
Render index.ejs
```

---

# Important Points

### `req.body`

Contains submitted form data.

---

### `new chat({...})`

Creates document object.

Does NOT insert into database.

---

### `save()`

Actually inserts document into MongoDB.

---

### `redirect()`

Redirects browser to another route.

Here:

```
POST /chats
```

↓

```
GET /chats
```

---

### `created_at`

```javascript
created_at: new Date()
```

Automatically stores current date & time.

---

# Common Mistakes

### ❌ Forgetting middleware

```javascript
app.use(express.urlencoded({ extended: true }));
```

Result:

```
req.body = undefined
```

---

### ❌ Missing `name`

```html
<input placeholder="From">
```

No `name`

↓

Not available in `req.body`.

---

### ❌ Using GET instead of POST

Wrong:

```html
<form>
```

Correct:

```html
<form method="POST" action="/chats">
```

---

### ❌ Forgetting `save()`

```javascript
let newChat = new chat({...});
```

Only creates object.

Nothing saved.

---

### ❌ Validation Error

Example

```javascript
message:{
    maxlength:40
}
```

If message exceeds limit

```
save()
```

fails with ValidationError.

---

# Placement Interview One-Liners

- `GET` → Fetch data.
- `POST` → Create new data.
- `req.body` → Contains form data.
- `express.urlencoded()` → Parses HTML form data.
- `new Model()` → Creates document object.
- `save()` → Inserts document into MongoDB.
- `redirect()` → Sends browser to another route.
- `res.render()` → Renders an EJS page.
- `res.redirect()` → Makes a new HTTP request to another route.