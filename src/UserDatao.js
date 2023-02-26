import React, { Component } from "react";
import "./Userdata.css";

export default class UserDetailso extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:9000/userData", {
      method: "Post",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        this.setState({ userData: data.data });
      });
  }

  render() {
    return (
      <div className="userdata">
        Name -:<h1>{this.state.userData.fname}</h1>
        Email -:<h1>{this.state.userData.email}</h1>
      </div>
    );
  }
}
