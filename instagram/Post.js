import React, { Component } from "react";
import "../../styles/main.css";
import Axios from "axios";
export class Post extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        profile: "",
        name: "",
        post: "",
        caption: "",
        data: []
      };
    }
  }
  componentDidMount() {
    console.log("component didmount called!!", this.props.uid);
    Axios.post("http://localhost:7000/users/postfetch", {
      uid: this.props.uid
    }).then(res => {
      console.log("fetched from post table!%%%%%%%%%%%%%%%%%%%%%%%", res);
      this.setState({
        data: res.data,
        post: res.data[0].image_url,
        name: res.data[0].username,
        profile: res.data[0].url,
        caption: res.data[0].caption
      });
    });
  }

  render() {
    const child1 = [];
    for (var i = 0; i < this.state.data.length; i++) {
      child1.push(
        <div className="insta-post-data">
          {/*header*/}
          <div className="insta-post-profile">
            <img
              className="insta-profile-avatar"
              src={this.state.data[i].url}
              alt="insta-profile"
            />
            <h3 className="insta-profile-name">
              {this.state.data[i].username}
              {/* {this.props.location.state.username} */}
            </h3>
            <span className="more">...</span>
          </div>
          {/*body*/}
          <img className="post-image" src={this.state.data[i].image_url} />

          {/*footer */}
          <div className="insta-post-footer">
            {/* <img
              className="insta-post-footer-like"
              src="https://pngimage.net/wp-content/uploads/2018/06/instagram-heart-icon-png-5.png"
              alt="like"
            /> */}
            <button className="insta-post-footer-like">Like</button>
            {/* <img
              className="insta-post-footer-comment"
              src="https://cdn0.iconfinder.com/data/icons/instagram-32/512/Comment_Chat-512.png"
              alt="like"
            /> */}
            <button className="insta-post-footer-comment">Comment</button>
            <span className="bookmark">
              <img
                className="insta-post-footer-bookmark"
                src="https://cdn130.picsart.com/288962137021211.png?r480x480"
                alt="bookmark"
              />
            </span>
          </div>
          <div>
            <h3>{this.state.data[i].caption}</h3>
          </div>
        </div>
      );
    }
    return <div>{child1}</div>;
  }
}

export default Post;
