import React, { useState } from "react";
import "./ChatBox.css";
import ChatMsg from "../ChatMsg/ChatMsg";
import axios from "../../../axios";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Avatar, IconButton } from "@material-ui/core";

function ChatBox({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/new", {
      message: input,
      name: "Shahzaib Azhar",
      timestamp: "Just Now",
      received: false,
    });

    setInput("");
  };
  return (
    <div className="chatbox">
      <div className="chatbox_header">
        <div className="chatbox_header_left">
          <Avatar src="https://th.bing.com/th/id/OIP.qRBkODrwp2v-BVbyz4qV0wHaHa?pid=ImgDet&rs=1" />
          <div className="chatbox_header_title">
            <a>Family</a>
            <p>Last seen</p>
          </div>
        </div>
        <div className="chatbox_header_right">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_box_body">
        {messages.map((messages, index) => (
          <div key={index}>
            <ChatMsg
              received={messages.received}
              name={messages.name}
              message={messages.message}
              timestamp={messages.timestamp}
            />
          </div>
        ))}
      </div>
      <div className="chatbox_input">
        <IconButton>
          <InsertEmoticonIcon className="emoji" />
        </IconButton>
        <IconButton>
          <InsertLinkIcon className="link" />
        </IconButton>

        <div className="chatbox_form">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here"
              type="text"
            />
            <div className="chatbox_online">
              <FiberManualRecordIcon className="online" />
            </div>
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </form>
        </div>

        <IconButton>
          <MicIcon className="mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatBox;
