import React from "react";
import "./Sidebar.css";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
// import db from "./firebase";
function Sidebar() {
  // const [rooms, setRooms] = useState([]);
  // useEffect(() => {
  //   db.collection("rooms").onSnapshot((snapshot) =>
  //     setRooms(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );
  // }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://www.bizzbuzz.news/images/authorplaceholder.jpg?type=1&v=1" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <p className="forgot-password text-right">
            <a href="./user-data">Account</a>
          </p>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chat">
        <SidebarChat />
        {/* <SidebarChat />
        <SidebarChat />
        <SidebarChat /> */}
        {/* {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))} */}
      </div>
    </div>
  );
}

export default Sidebar;
