import React from "react";
import "./SideBarChat.css";
import { Avatar } from "@material-ui/core";

function SideBarChat() {
  return (
    <div className="side_bar_chat">
      <Avatar />
      <div className="side_bar_chat_content">
        <h3>Name</h3>
        <p>chats talk</p>
      </div>
    </div>
  );
}

export default SideBarChat;
