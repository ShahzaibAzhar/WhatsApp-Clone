import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SideBarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__content">
        <h3>Name</h3>
        <p>chats talk</p>
      </div>
    </div>
  );
}

export default SideBarChat;
 