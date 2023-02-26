import { Avatar } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import axios from "./axios";

import "./Chat.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
// import SelectInput from "@mui/material/Select/SelectInput";
import MicIcon from "@mui/icons-material/Mic";

function Chat({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
  /////
  ////
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Name",
      timestamp: "Just now!",
      /////////////////////////////////
      received: true,
      /////////////////////////////////////////////
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Public Room</h3>
          {/* <p>Last seen at....</p> */}
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((messages) => (
          <p
            className={`chat__message ${messages.received && "chat__reciever"}`}
          >
            <span className="chat__name">{messages.name}</span>
            {messages.message}
            <span className="chat__timestamp">{messages.timestamp}</span>
          </p>
        ))}
        {/* <p className=" chat__message">
          <span className="chat__name">Sonny</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className=" chat__message chat__reciever">
          <span className="chat__name">Sonny</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}

        <div ref={messagesEndRef} />
      </div>
      <div className="chat__footer">
        <EmojiEmotionsOutlinedIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
