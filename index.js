const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("connection sucessfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
}

// Index Route
app.get("/chats", async (req, res) => {
  let allChats = await Chat.find();
  res.render("index.ejs", { allChats });
});

// New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((savedChat) => {
      console.log("chat was saved!", savedChat._id);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update route
app.put("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let { from, to, msg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { from, to, msg },
    { runValidators: true, new: true },
  );

  console.log(updatedChat);
  res.redirect("/chats");
});

// Delete Route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Wecome to Home Page!");
});

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000/`);
});
