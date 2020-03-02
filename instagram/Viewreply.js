import React, { Component } from "react";
import Axios from "axios";

export class Viewreply extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        replies: []
      };
    }
  }
  componentDidMount() {
    console.log("HURRRAHHHHHHHHH----------------------->", this.props.cid);
    Axios.post("http://localhost:7000/users/viewreply", {
      cid: this.props.cid
    }).then(res => {
      console.log("VIEW REPLYYYYYYYYYYYYY------->", res);
    });
  }
  render() {
    return (
      <div>
        <h6>repliesejkfjekj</h6>
      </div>
    );
  }
}

export default Viewreply;
