import React, { Component } from "react";
import "../../styles/main.css";
import Profile2 from "./Profile2";
import Post1 from "../instagram/Post1";
export class Profile1 extends Component {
  render() {
    return (
      <div>
        <div className="mainposts">
          <Profile2
            uid={this.props.uid}
            username={this.props.username}
            fullname={this.props.fullname}
            email={this.props.email}
          />
          <div className="insta-post">
            {/*there will be lot of insta-post data */}

            <Post1 uid={this.props.uid} username={this.props.username} />

            {/*end of insta-post data */}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile1;
