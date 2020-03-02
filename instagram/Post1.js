import React, { Component } from "react";
import "../../styles/main.css";
import Footer from "./Footer";
import Axios from "axios";
export class Post1 extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        post: []
      };
    }
  }
  componentDidMount() {
    Axios.post("http://localhost:7000/users/post1", {
      uid: this.props.uid
    }).then(res => {
      console.log("COMPONENT DID MOUNT OF POST1------------>", res.data);
      if (res.data !== "failed") {
        this.setState({
          post: res.data
        });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.post.map(i => {
          return (
            <div key={i.key} className="insta-post-data">
              {/*header*/}
              <div className="insta-post-profile">
                <img
                  className="insta-profile-avatar"
                  src={i.url}
                  alt="insta-profile"
                />
                <h3 className="insta-profile-name">{this.props.username}</h3>
                <span className="more">...</span>
              </div>
              {/*body*/}
              <img className="post-image" src={i.image_url} />
              <div>
                <h3>{i.caption}</h3>
              </div>
              {/*footer */}
              <Footer pid={i.id} uid={this.props.uid} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Post1;
