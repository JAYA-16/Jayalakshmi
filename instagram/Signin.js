import React, { Component } from "react";
import "../../styles/signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
export class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      fullname: "",
      email: "",
      id: ""
    };
  }
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
  handleSignin = event => {
    axios
      .post("http://localhost:7000/users/signin", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        console.log("=====>", res.data);
        if (res.data === "failed") {
          console.log("Incorrect login data");
          alert("Please Sign Up ....Your login data is invalid!");
        } else if (res.data === "Error") {
          console.log("Error Occurred!");
          alert("Please Sign Up ....or try login  again!");
        } else {
          console.log("successfully signed in!!!", res.data.username);
          this.setState({
            id: res.data.id
          });
          console.log("these are all state values!!!!", this.state.email);
          this.props.history.push({
            pathname: "/main",
            state: {
              id: this.state.id,
              username: this.state.username,
              fullname: res.data.fullname,
              email: res.data.email
            }
          });
        }
        //
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
            <button className="signin" onClick={this.handleSignin}>
              Log In
            </button>
            <br />
            <h4>
              <span>OR</span>
            </h4>
            <div className="fb1">
              <img
                className="fb"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEU6VZ////81Up0yT5xgc61+jbsvTZyXo8hFXaOirM0nSJmlrs7O1OUkRpkfQ5c1UZ1oerKHlcDp6/M9WKHHzeHV2ulxgravt9Td4Ozl6PGDkb7ByN5YbatQZ6j29/q3v9h2hrhMY6aQnMSsAnKHAAAC70lEQVR4nO3caXLiMBRFYdoihhhsQ5jDlPT+F9mdqv7bRrYQ7z7XOQug9BUWHiQzmRARERERERERERERERERqVe0IZQPCtaDHFwo62Yz/VrP3jtbrH0Sy7rYH46/YtpV1oPtX6jCbBel+2npThjq/Taa51AYmrdTH583YdHsP/r5nAnLTa/j05+w+ezv8yRsq/MQoB9hmPeegb6E5eU2DOhFWK4G+rwIw3CgD2G4Dge6ELaboXPQi7CJu4nwK6zvKUAHwvCVBHQgrFMmoQdh4jGqL2wviUB5YRP/uMKnsJ2mAtWF9XLkwjblcs2FsDqMXZh6LpQXhn06UFtYpZ7t5YX1wEczboTF/AlAaWFYP0OovPZU9pmGt9194W79sIq/Jt2uqqrytwbcxJ4NT9e6tR7soEIk8N749E2K7zjgubEe6dAi75yOboGxwrnTQ/RvRZTwIHy6e1SccF5Yj3N4UcJjbT3MhKKEh9J6mAlFCZWvyR4WJXxDqBxChPohRKgfQoT6IUSoH0KE+iFEqB9ChPqNQ1h0vKJcxWwt/aofvelsDFzNOlpECO9dH/DT+8ZUWMYgErNdfXuB8Ga7RPwCofHy2wuE59EfpQvbH9MXCNejF65st2q8QPhtu5Mhv/BmfE2TX/hhvGMqv3BpvBslv/BuvGUqv3A2+nloff+YX3gx3rmYX2j9CCC78Ga9NzO78GS9dTG7cDv679B8c2Z24e/R/9LsRy+8Wm/kzy60nobZhdb3TvmF9u8e5hYaP0p8gfB99PPQ/l2F3MKp+StDuYXWvuxC60eJ+YXm907ZhQJ/NlA+4d9ZOrrbH6WTzbyjmL+D/Oz6BNsl/H8V/y9E7TYpOz7BGveoceyn6QohQv0QItQPIUL9ECLUDyFC/RAi1A8hQv0QItQPIUL9ECLUDyFC/RAi1A8hQv0QItQPIUL9ECLUDyFC/RAi1A8hQv0QItQPIUL9ECLUDyFC/RAi1A8hQv0QItQPIUL9ECLs0R8aFUYEFLSeAgAAAABJRU5ErkJggg=="
                alt="Login with facebook"
              />
              <p className="fblogin">Log In with Facebook</p>
            </div>
            <p className="forgotpassword">Forgot Password ?</p>
            <br />
          </div>
        </div>
        <div className="main2">
          <p className="login">Don't have an account?</p>
          <Link className="link" to={"/"}>
            Sign Up
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

export default Signin;
