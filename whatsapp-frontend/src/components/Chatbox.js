import React, { useState } from "react";
import "./Chatbox.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import MicIcon from "@material-ui/icons/Mic";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SendIcon from "@material-ui/icons/Send";
import axios from "../axios";

function Chatbox({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Shahzaib Azhar",
      timestamp: "Just Now",
      received: false,
    });

    setInput("");
  };
  return (
    <div className="chatbox">
      <div className="chatbox__header">
        <div className="chatbox__header__left">
          <Avatar src="https://th.bing.com/th/id/OIP.qRBkODrwp2v-BVbyz4qV0wHaHa?pid=ImgDet&rs=1" />
          <div className="chatbox__header__title">
            <h3>Name</h3>
            <p>Last seen</p>
          </div>
        </div>
        <div className="chatbox__header__right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbox__body">
        {messages.map((messages) => (
          <p className={`chat__msg ${messages.received || "chat__receiver"}`}>
            <span className="chat__name">{messages.name}</span>
            <p>{messages.message}</p>
            <span
              className={`chat__timestamp ${
                messages.received || "chat__receiver__timestamp"
              }`}
            >
              {messages.timestamp}
            </span>
          </p>
        ))}
      </div>
      <div className="chatbox__input">
        <IconButton>
          <InsertEmoticonIcon className="emoji" />
        </IconButton>

        <IconButton>
          <InsertLinkIcon className="link" />
        </IconButton>

        <div className="chatbox__input__msg">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here"
              type="text"
            />
            <FiberManualRecordIcon className="online" />
            <button onClick={sendMessage} type="submit">
              <SendIcon />
            </button>
          </form>
        </div>

        <IconButton>
          <MicIcon className="mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chatbox;
