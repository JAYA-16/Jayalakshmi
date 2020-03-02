import React, { Component } from "react";
import "../../styles/main.css";
import Home1 from "./Home1";
import Profile1 from "./Profile1";

export class Main1 extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        profile: false,
        uid: this.props.location.state.id
      };
    }
  }
  homepage = event => {
    this.setState({
      profile: false
    });
  };
  profilepage = event => {
    this.setState({
      profile: true
    });
  };
  render() {
    return (
      <div>
        <div className="Mainpage">
          <div className="header">
            <img
              className="mainlogo"
              src="https://i.pinimg.com/originals/08/17/15/0817158f3a05c0d62de647c28f4cde54.jpg"
              alt="mainlogo"
              onClick={this.homepage}
            />
            <div className="vl"></div>
            <img
              className="mainlogo1"
              src="https://www.stickpng.com/assets/images/5a4e432a2da5ad73df7efe7a.png"
              alt="mainlogo"
              onClick={this.homepage}
            />
            <input type="text" className="searchbar" placeholder="Search..." />
            <img
              className="discover"
              src="https://static.thenounproject.com/png/782776-200.png"
              alt="discover"
            />
            <img
              className="fav"
              src="https://pngimage.net/wp-content/uploads/2018/06/instagram-heart-icon-png-5.png"
              alt="favourite"
            />

            <img
              className="people"
              src="https://cdn2.iconfinder.com/data/icons/instagram-ui/48/jee-74-512.png"
              alt="people"
              onClick={this.profilepage}
            />
          </div>
        </div>
        {this.state.profile ? (
          <div className="insta-profile-page">
            <Profile1
              uid={this.state.uid}
              username={this.props.location.state.username}
              fullname={this.props.location.state.fullname}
              email={this.props.location.state.email}
            />
          </div>
        ) : (
          <div className="insta-home-page">
            <Home1
              uid={this.state.uid}
              username={this.props.location.state.username}
              fullname={this.props.location.state.fullname}
              email={this.props.location.state.email}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Main1;
