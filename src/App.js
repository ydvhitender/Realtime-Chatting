import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";

import Pusher from "pusher-js";
import axios from "./axios";
import React from "react";
import SignUp from "./signup_component.js";
import Login from "./login_component.js";
import UserDetailso from "./UserDatao.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Login from "./Login";

function App() {
  ////////

  ////////
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("f1c4b8bbcaa37a57f397", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <Router>
      <div className="app">
        <div className="app__boddy">
          <div className="app__body">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/user-data" element={<UserDetailso />} />
              <Route
                path="/userDetails"
                element={
                  <>
                    <Sidebar />

                    <Chat messages={messages} />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    // <div className="app">
    //   <div className="app__body">
    //     {/* <Login /> */}
    //     <SignUp />

    //     {/* <Sidebar />
    //     <Chat messages={messages} /> */}
    //   </div>
    // </div>
  );
}

export default App;
