# Troubleshooting

> Small Things that I Figure Out

### 📍When I got CORS error whilst running my express local server

[3 ways to fix CORS error](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)

```js
[server.js];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.json({ ip: "222.107.238.125" });
});
```

- Simply make own middleware to add header to every response from the server.
- Or `const cors = require('cors');` and `app.use(cors())`

### 📍How to prevent SQL injection on Node.js

```js
con.query(
  `SELECT * FROM members WHERE (email = ? AND password = ?);`,
  [req.body.email, req.body.password],
  (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.json({ message: `Welcome! ${result[0].name}` });
  }
);
```

- Fix the SQL syntax with "?"(placeholder) and send data through the second paramater of `con.query()`

### 📍Free from .addEventListener for dynamic rendering in vanilla JS

[onevent handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers)  
[GlobalEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)

```js
// element with eventlistner
<tr>
  <td onclick="displayComment('${comment._id}', '${comment.comment}')">
    ${comment._id}
  </td>
</tr>;
// -> don't forget to add "" for event handler function

// event handler //
function displayComment(id, comment) {
  commentId.value = id;
  commentComment.value = comment;
}
```
