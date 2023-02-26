// importing

import express from "express";
import mongoose from "mongoose";
// import dbMessages from "./dbMessages";
import Messages from "./dbMessages.js";
import UserLis from "./userDetails.js";

import Pusher from "pusher";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "jhkghghhg77899()hgf89898765g667fghfghuu687865?[]pk";

//app config

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1524578",
  key: "f1c4b8bbcaa37a57f397",
  secret: "004dc01e598c91b35327",
  cluster: "ap2",
  useTLS: true,
});

//middleleware

app.use(express.json());

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//Db config
mongoose.set("strictQuery", true);
const connection_url =
  //////////////////////////////////////////////////////////////////////////////////
  "Mongo Db URL";
////////////////////////////////////////////////////////////////////////////
mongoose.connect(connection_url, {
  //   useCreateIndex: true,
  //   // useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");

  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//listner

// require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exist" });
    }

    await UserLis.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
//     (err, data) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(201).send(data);
//       }
//     }
//   );
// });

// app.post("/register", async (req, res) => {
//   const { name, email, mobileNo } = req.body;
//   try {
//     await User.create({
//       uname: name,
//       email,
//       phoneNo: mobileNo,
//     });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
