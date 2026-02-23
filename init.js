const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then((res) => {
    console.log("connection sucessfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatapp");
}

let allChats = [
  {
    from: "abc",
    to: "xyz",
    msg: "send me dsa question sheet",
    created_at: new Date(),
  },
  {
    from: "jay",
    to: "raj",
    msg: "please share notes",
    created_at: new Date(),
  },
  {
    from: "neha",
    to: "amit",
    msg: "meeting at 5 pm",
    created_at: new Date(),
  },
  {
    from: "sona",
    to: "ravi",
    msg: "did you complete assignment",
    created_at: new Date(),
  },
  {
    from: "kiran",
    to: "meera",
    msg: "let us practice coding",
    created_at: new Date(),
  },
  {
    from: "arun",
    to: "nina",
    msg: "project demo is tomorrow",
    created_at: new Date(),
  },
  {
    from: "pooja",
    to: "vivek",
    msg: "send the mongo db link",
    created_at: new Date(),
  },
  {
    from: "rohan",
    to: "tina",
    msg: "class starts in 10 min",
    created_at: new Date(),
  },
  {
    from: "simran",
    to: "manav",
    msg: "check the latest commit",
    created_at: new Date(),
  },
  {
    from: "isha",
    to: "dev",
    msg: "task is completed",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats)
  .then((res) => console.log("data saved successfully", res))
  .catch((err) => console.log("error in saving data", err));

