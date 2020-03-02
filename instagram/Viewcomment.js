import React, { Component } from "react";
import Axios from "axios";
import Viewreply from "../instagram/Viewreply";
import Viewreply1 from "../instagram/Viewreply1";
export class Viewcomment extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        comments: [],
        cid: "",
        reply: ""
      };
    }
  }
  componentDidMount() {
    //fetch from the comment table---fetch comment and uid and number of replies
    console.log("jwhkehed:", this.props.pid);
    Axios.post("http://localhost:7000/users/totalreplies", {
      pid: this.props.pid
    }).then(res => {
      console.log("VIEWCOMMENT COMPONENT DID MOUNT--------->", res);
      if (res.data !== "failed") {
        this.setState({
          comments: res.data,
          cid: res.data[0].id,
          show: false
        });
      }
    });
  }
  showreply = event => {
    this.setState({
      show: !this.state.show
    });
  };
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
  render() {
    return (
      <div>
        {this.state.comments.map(i => {
          return (
            <div className="comment-section">
              <div className="view-comments">
                <p className="view-comment">{i.comment}</p>
                <h6>commented by:{i.username}</h6>
                <h6 onClick={this.showreply}>{i.total_replies} replies</h6>
              </div>
              <div>
                <div className="displayreply3">
                  <input
                    className="replyinput"
                    type="text"
                    value={this.state.reply}
                    onChange={this.handleReply}
                  />
                  <button
                    onClick={e => this.reply(e, i.id)}
                    className="displayreply1"
                  >
                    reply
                  </button>
                </div>
              </div>
              {this.state.show ? (
                <div>
                  <Viewreply1 cid={this.state.cid} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Viewcomment;
