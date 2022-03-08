import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import Cors from "cors";

//http://localhost:9000/messages/sync
//test data
/*
{
    "message": "new message 14",
    "name": "Shahzaib Azhar",
    "timestamp": "timestamp 14",
    "received": false
}
*/

//

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1233476",
  key: "e2795ef5eb30cdf2a899",
  secret: "56d7e5e451a691d991fb",
  cluster: "eu",
  useTLS: true,
});

//
//middleware
app.use(express.json());
app.use(Cors()); //set headers

//
//DBconfig
const connection_url =
  "mongodb+srv://admin:UPV8BYYc99ESn8UQ@cluster0.dkmet.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

//
//???

//
//api routes
app.get("/", (req, res) => res.status(200).send("hello world, I am Backend"));

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
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

//
//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
