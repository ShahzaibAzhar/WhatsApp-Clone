import React from "react";
import "./ChatMsg.css";

function ChatMsg({ received, name, message, timestamp }) {
  return (
    <div className={`chat_msg ${received || "chat_msg_receiver"}`}>
      <span className="chat_msg_name">{name}</span>
      <p className="chat_msg_body">
        {message}
        {/* <a href="">see more</a> */}
      </p>
      <span
        className={`chat_msg_timestamp ${
          received || "chat_msg_receiver_timestamp"
        }`}
      >
        {timestamp}
      </span>
    </div>
  );
}

export default ChatMsg;
