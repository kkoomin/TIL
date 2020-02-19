# MongoDB & Mongoose Practice

2020.02.19.Wed

### Structure

```
public
    -- index.html
    -- comment.js
    -- user.js
routes
    -- commentRouter.js
    -- userRouter.js
schemas
    -- index.js
    -- user.js
    -- comment.js
-- server.js
-- package.json
```

### package.json

```json
{
  "name": "test1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1", // Web server library
    "mongodb": "^3.5.3", // Database
    "mongoose": "^5.9.1" // MongoDB Object Data Modeling (ODM) library
  }
}
```

### index.html

```html
<head>
  <script src="./comment.js" defer></script>
</head>
...
<!-- Comment -->
<div class="comment-container">
  <h1>댓글달기</h1>
  <div class="comment-form">
    <form>
      <input type="text" id="user-id" placeholder="사용자 아이디" />
      <br />
      <input type="text" id="user-comment" placeholder="댓글" />
      <br />
      <button class="comment-submit-btn">등록</button>
    </form>
  </div>

  <div class="comment-list">
    <table id="comment-table" border="1"></table>
  </div>
</div>
...
```

### (public) comment.js

```js
getComments(); // getComments when the page loaded

const commentBtn = document.querySelector(".comment-submit-btn");
const commentTable = document.querySelector("#comment-table");
const commentId = document.querySelector("#user-id");
const commentComment = document.querySelector("#user-comment");

// Event Listener //
commentBtn.addEventListener("click", submitComment);

// Event Handler //
// 1. Create Comment
function submitComment() {
  const id = commentId.value;
  const comment = commentComment.value;
  const data = {
    id,
    comment
  };
  const options = {
    //set headers and put the data in the body part
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ data })
  };
  fetch("/comment/addComment", options)
    .then(res => res.json())
    .then(json => {
      alert(json.message);
    });
}

// 2. Read Comment
function getComments() {
  fetch("/comment/getComments")
    .then(res => res.json())
    .then(json => {
      const comments = json.comments;
      let commentRow = `
      <tr>
        <td>아이디</td>
        <td>작성자</td>
        <td>댓글</td>
        <td>수정</td>
        <td>삭제</td>
      </tr>
      `;
      comments.forEach(comment => {
        commentRow += `
        <tr>
            <td onclick="displayComment('${comment._id}', '${comment.comment}')">${comment._id}</td>
            <td>${comment.commenter.name}</td>
            <td>${comment.comment}</td>
            <td><button class="comment-update" onclick="updateComments()">수정</button></td>
            <td><button class="comment-delete" onclick="deleteComments('${comment._id}')">삭제</button></td>
        </tr>
      `;
        commentTable.innerHTML = commentRow;
      });
    });
}

// 3. Update Comment
function updateComments() {
  const id = commentId.value;
  const comment = commentComment.value;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ comment })
  };

  fetch(`/comment/${id}`, options)
    .then(res => res.json())
    .then(json => {
      alert(json.message);
    });
}

// 3-1. Render comment on input field to get new input for update
function displayComment(id, comment) {
  commentId.value = id;
  commentComment.value = comment;
}

// 4. Delete Comment
function deleteComments(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };

  fetch(`/comment/${id}`, options)
    .then(res => res.json())
    .then(json => {
      alert(json.message);
    });
}
```

### commentRouter.js

```js
const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");

// Create
router.post("/addComment", async (req, res) => {
  try {
    console.log(req.body.data);
    const comment = new Comment({
      commenter: req.body.data.id,
      comment: req.body.data.comment
    });
    const result = await comment.save();
    Comment.populate(result, { path: "commenter" });
    res.json({ message: "Comment Added!" });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// Read
router.get("/getComments", async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("commenter");
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.json({ message: false });
  }
});

// Update
router.post("/:id", (req, res) => {
  Comment.update({ _id: req.params.id }, { comment: req.body.comment })
    .then(() => res.json({ message: "Comment Updated!" }))
    .catch(err => {
      console.log(err);
    });
});

// Delete
router.delete("/:id", (req, res) => {
  Comment.remove({ _id: req.params.id })
    .then(() => res.json({ message: "Comment Deleted!" }))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
```

### (Schema) comment.js

```js
const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  comment: {
    type: String,
    required: false
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
```
