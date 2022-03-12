import React from "react";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__header__pic">
          <Avatar src="https://th.bing.com/th/id/OIP.CsCp-2Ng2Ql_lovlnRh4XwHaHa?pid=ImgDet&rs=1" />
        </div>
        <div className="sidebar__header__right">
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
      <div className="sidebar__header__searchbar">
        <div className="sidebar__header__input">
          <SearchIcon />
          <input placeholder="Search or Start New Chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SideBarChat />
        <SideBarChat />
      </div>
    </div>
  );
}

export default Sidebar;
