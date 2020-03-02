import React, { Component } from "react";
import Axios from "axios";
import Displayreply from "../instagram/Displayreply";
// import Viewreply from "../instagram/Viewreply";
// import Viewreply1 from "../instagram/Viewreply1";
export class Viewreply1 extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        replies: []
      };
    }
  }
  componentDidMount() {
    //fetch from the comment table---fetch comment and uid and number of replies
    // console.log("jwhkehed:", this.props.pid);
    //
    console.log("hurrrararrarar------------------->", this.props.cid);
    Axios.post("http://localhost:7000/users/viewreply", {
      cid: this.props.cid
    }).then(res => {
      console.log("VIEW REPLYYYYYYYYYYYYY------->", res);
      if (res.data !== "failed") {
        this.setState({
          replies: res.data
        });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.replies.map(i => {
          return (
            <div className="view-reply">
              <Displayreply reply={i.reply} />
              {/* {i.reply} */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Viewreply1;
