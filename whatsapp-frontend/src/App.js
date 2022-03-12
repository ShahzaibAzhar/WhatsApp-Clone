import React, { useState, useEffect } from "react";
import "./App.css";
import ChatBox from "./components/ChatBox";
import SideBar from "./components/SideBar";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/sync").then((response) => {
      //console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("e2795ef5eb30cdf2a899", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <ChatBox messages={messages} />
      </div>
    </div>
  );
}

export default App;
