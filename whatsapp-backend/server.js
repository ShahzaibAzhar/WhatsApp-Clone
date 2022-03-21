import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//http://localhost:9000/sync
//test data
/*
{
    "message": "new message 14",
    "name": "Shahzaib Azhar",
    "timestamp": "timestamp 14",
    "received": false
}
*/

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1233476",
  key: "e2795ef5eb30cdf2a899",
  secret: "56d7e5e451a691d991fb",
  cluster: "eu",
  useTLS: true,
});

app.use(express.json());
app.use(cors()); //set headers

const connection_url =
  "mongodb+srv://admin:3Mi85siz1clVbrGF@cluster0.dkmet.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url);

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB Connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

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

//
app.get("/", (req, res) => res.status(200).send("Hello World I Am Backend"));

app.get("/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening to localhost:${port}`));
