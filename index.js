const express = require("express");
const app = express();

const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("connection sucessfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
}

app.get("/", (req, res) => {
  res.send("Wecome to Home Page!");
});

app.listen(8080, () => {
  console.log(`server is running on https://localhost:8080/`);
});
