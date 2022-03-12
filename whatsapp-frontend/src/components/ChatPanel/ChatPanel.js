import React from "react";
import "./ChatPanel.css";
import { Avatar } from "@material-ui/core";

function ChatPanel({ header, msg }) {
  return (
    <div className="chat_panel">
      <Avatar />
      <div className="chat_panel_chats">
        <p className="chat_panel_chats_header">{header}</p>
        <p className="chat_panel_chats_msg">{msg}</p>
      </div>
    </div>
  );
}

export default ChatPanel;
