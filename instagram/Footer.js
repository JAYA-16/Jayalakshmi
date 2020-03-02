import React, { Component } from "react";
import Comment from "./Comment";
import "../../styles/main.css";
import Axios from "axios";

export class Footer extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        likes: 0
      };
    }
  }
  componentDidMount() {
    Axios.post("http://localhost:7000/users/totallikes", {
      pid: this.props.pid
    }).then(res => {
      console.log("Footer---------->", res);
      if (res.data !== "failed") {
        this.setState({
          likes: res.data[0].count
        });
      }
    });
  }
  handleLike = event => {
    Axios.post("http://localhost:7000/users/like", {
      pid: this.props.pid,
      uid: this.props.uid
    }).then(res => {
      console.log("LIKED", res);
      console.log(parseInt(this.state.likes) + 1);
      this.setState({ likes: parseInt(this.state.likes) + 1 });
    });
  };
  render() {
    return (
      <div>
        <div className="insta-post-footer-data">
          <p> {this.state.likes} like</p>
        </div>
        <div className="insta-post-footer">
          {/* <button className="insta-post-footer-like" onClick={this.handleLike}>
            like
          </button> */}
          <img
            className="likebtn"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bot%C3%B3n_Me_gusta.svg/1200px-Bot%C3%B3n_Me_gusta.svg.png"
            onClick={this.handleLike}
          />
        </div>
        <div>
          <Comment pid={this.props.pid} uid={this.props.uid} />
        </div>
      </div>
    );
  }
}

export default Footer;
