import React, { Component } from "react";
import "../../styles/main.css";
import Axios from "axios";
import Viewcomment from "../instagram/Viewcomment";
export class Comment extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        comments: 0,
        comment: "",
        show: false
      };
    }
  }
  componentDidMount() {
    console.log("KDDDDDDDDDDDDDDDDDDD", this.props.pid);
    Axios.post("http://localhost:7000/users/totalcomments", {
      pid: this.props.pid
    }).then(res => {
      console.log("Comment---------->", res.data[0].count);
      if (res.data === "failed") {
        this.setState({
          comments: 0
        });
      } else {
        this.setState({
          comments: res.data[0].count
        });
      }
    });
  }
  showcomment = event => {
    this.setState({
      show: !this.state.show
    });
  };
  handleCommentChange = event => {
    //console.log("HAPPY!!!!!!!!!!!!!!!---------------->", event.target.value);
    this.setState({
      comment: event.target.value
    });
  };
  handleComment = event => {
    console.log("COMMENT------>", this.props.pid);
    Axios.post("http://localhost:7000/users/comment", {
      pid: this.props.pid,
      uid: this.props.uid,
      comment: this.state.comment
    }).then(res => {
      console.log("COMMENT", res);
      this.setState({
        comment: "",
        comments: parseInt(this.state.comments) + 1
      });
    });
  };
  render() {
    return (
      <div>
        <div className="insta-post-footer-data">
          <p>{this.state.comments} comments</p>
        </div>
        <div className="insta-post-footer">
          <input
            className="insta-post-footer-commentbox"
            type="text"
            placeholder="Add your comments here..."
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
          <button
            className="insta-post-footer-like"
            onClick={this.handleComment}
          >
            post
          </button>
        </div>
        <h5 className="comment-link" onClick={this.showcomment}>
          view comments
        </h5>
        {this.state.show ? (
          <div>
            <Viewcomment pid={this.props.pid} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Comment;
