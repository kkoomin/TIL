# Small Things that I Figure Out

### When I got CORS error whilst running my express server

[3 ways to fix CORS error](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9)

```js
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
