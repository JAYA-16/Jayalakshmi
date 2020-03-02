import React, { Component } from "react";
import "../../styles/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      username: "",
      password: ""
    };
  }
  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  handleFullnameChange = event => {
    this.setState({
      fullname: event.target.value
    });
  };
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleSignup = event => {
    //put inside the databases
    console.log("hey");
    axios
      .post("http://localhost:7000/users/signup", {
        email: this.state.email,
        fullname: this.state.fullname,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          // alert("welcome to Instagram! Signin please!");
          this.props.history.push({
            pathname: "/signin"
          });
        }
      });
  };
  render() {
    return (
      <div>
        <div className="main">
          <div className="main1">
            <img
              className="logo"
              src="https://fontmeme.com/images/instagram-new-logo.png"
              alt="Instagram"
            />
            <h3>
              Sign up to see photos and videos <br />
              from your friends
            </h3>
            <input
              className="data"
              type="text"
              placeholder="Mobile Number or Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <input
              className="data"
              type="text"
              placeholder="Fullname"
              value={this.state.fullname}
              onChange={this.handleFullnameChange}
            />
            <input
              className="data"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <input
              className="data"
              type="text"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <br />
            <button className="signup" onClick={this.handleSignup}>
              Sign up
            </button>
            <h5>
              By signing up, you agree to our <br />
              Terms , Data Policy and Cookies <br />
              Policy .
            </h5>
          </div>
        </div>
        <div className="main2">
          <p className="login">Have an account?</p>
          <Link className="link" to={"signin"}>
            Login
          </Link>
        </div>
        <div className="icons">
          Get the app.
          <br />
          <img
            className="icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
            alt="icon"
          />
          <img
            className="icon1"
            src="https://www.focuspointeglobal.com/wp-content/uploads/2018/11/download-on-the-app-store-icon-0.png"
            alt="icon1"
          />
        </div>
      </div>
    );
  }
}

export default Signup;
