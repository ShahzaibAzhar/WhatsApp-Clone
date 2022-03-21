import React from "react";
import "./SidePanel.css";
import ChatData from "./chat_data.json";
import ChatPanel from "../ChatPanel/ChatPanel";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";

function SidePanel() {
  return (
    <div className="side_panel">
      <div className="side_panel_top_bar">
        <Avatar src="https://th.bing.com/th/id/OIP.CsCp-2Ng2Ql_lovlnRh4XwHaHa?pid=ImgDet&rs=1" />
        <div className="side_panel_top_bar_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="side_panel_search_bar">
        <div className="side_panel_input">
          <SearchIcon />
          <input placeholder="Search or Start New Chat" type="text" />
        </div>
      </div>
      <div className="side_panel_chats">
        {ChatData.map((data) => {
          return (
            <div>
              <ChatPanel header={data.header} msg={data.msg} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SidePanel;
