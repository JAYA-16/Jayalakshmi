import React, { Component } from "react";
import "../../styles/main.css";
import Axios from "axios";
export class Home extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        data: [],
        comments: "",
        view: false,
        replyshow: false
      };
    }
  }
  componentDidMount() {
    console.log("component didmount called!!", this.props.uid);
    Axios.post("http://localhost:7000/users/homefetch").then(res => {
      console.log("fetched from post table-------->", res);
      this.setState({
        data: res.data
      });
    });
    console.log("FETCHING FROM THE COMMENT TABLE!");
  }
  handleLike(event, pid) {
    //put it into the like table
    //this.props.uid
    console.log("PID---->", pid);
    Axios.post("http://localhost:7000/users/like", {
      pid: pid,
      uid: this.props.uid
    }).then(res => {
      console.log("LIKED", res);
    });
  }
  handleCommentChange = event => {
    this.setState({
      comment: event.target.value
    });
  };
  handleComment(event, pid) {
    console.log("COMMENT------>", this.state.comment, pid);
    Axios.post("http://localhost:7000/users/comment", {
      pid: pid,
      uid: this.props.uid,
      comment: this.state.comment
    }).then(res => {
      console.log("COMMENT", res);
      this.setState({
        comment: ""
      });
    });
  }
  handleReply = event => {
    this.setState({
      reply: event.target.value
    });
  };
  reply(e, id) {
    //put it into the reply database
    console.log("THIS IS THE COMMENT ID WANT TO REPLY", id);
    Axios.post("http://localhost:7000/users/reply", {
      cid: id,
      reply: this.state.reply
    }).then(res => {
      console.log("REPLIED------------->", res);
      this.setState({
        reply: ""
      });
    });
  }
  showView(event, pid) {
    // Axios.post("http://localhost:7000/users/commentfetch", { pid: pid }).then(
    //   res => {
    //     console.log("COMMENT FETCHED!", res.data);
    //     this.setState({
    //       comments: res.data,
    //       view: true
    //     });
    //   }
    // );
    this.setState({
      view: true
    });
  }
  showReply(e, cid) {
    Axios.post("http://localhost:7000/users/replyfetch", { cid: cid }).then(
      res => {
        console.log("REPLY FETCH RESPONSE-------------->", res);
        if (res.data != "failed") {
          this.setState({
            replydata: res.data[0].reply,
            replyshow: true
          });
        }
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.data.map(i => {
          if (i.comment != null) {
            var array = i.comment;
            var array1 = array.split(",");
            var arr = i.cid;
            var array2 = arr.split(",");
          }

          return (
            <div className="insta-post-data">
              {/*header*/}
              <div className="insta-post-profile">
                <img
                  className="insta-profile-avatar"
                  src={i.url}
                  alt="insta-profile"
                />
                <h3 className="insta-profile-name">
                  {i.username}
                  {/* {this.props.location.state.username} */}
                </h3>
                <span className="more">...</span>
              </div>
              {/*body*/}
              <div>
                <h3>{i.caption}</h3>
              </div>
              <img className="post-image" src={i.image_url} />

              {/*footer */}
              <div className="insta-post-footer-data">
                {/* <p>{i.count} likes</p> */}
              </div>
              <div className="insta-post-footer">
                <button
                  className="insta-post-footer-like"
                  onClick={e => this.handleLike(e, i.id)}
                >
                  like
                </button>

                <span className="bookmark">
                  <img
                    className="insta-post-footer-bookmark"
                    src="https://cdn130.picsart.com/288962137021211.png?r480x480"
                    alt="bookmark"
                  />
                </span>
              </div>
              <div>
                <input
                  className="insta-post-footer-commentbox"
                  type="text"
                  placeholder="Add your comments here..."
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                />
                <button onClick={e => this.handleComment(e, i.id)}>Post</button>
              </div>
              <div className="displaycomment">
                {i.comment != null
                  ? array1.map((j, index) => {
                      return (
                        <div className="column">
                          <div className="displayreply">
                            <h5>{j}</h5>
                            <h5>{array2[index]}</h5>
                          </div>
                          <div className="displayreply3">
                            <input
                              className="replyinput"
                              type="text"
                              value={this.state.reply}
                              onChange={this.handleReply}
                            />
                            <button
                              onClick={e => this.reply(e, array2[index])}
                              className="displayreply1"
                            >
                              reply
                            </button>
                          </div>
                          <div>
                            <h5
                              className="displayreply2"
                              onClick={e => this.showReply(e, array2[index])}
                            >
                              replies
                            </h5>
                          </div>
                          {this.state.replyshow ? (
                            <div>
                              <h5>{this.state.replydata}</h5>
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </div>

              {/* <h6
                className="insta-post-footer-viewcomments"
                onClick={this.showView}
              >
                view comments
              </h6>
              {this.state.view ? <div>comment</div> : null} */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
