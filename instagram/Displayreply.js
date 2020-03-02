import React, { Component } from "react";

export class Displayreply extends Component {
  render() {
    return (
      <div>
        <p>{this.props.reply}</p>
      </div>
    );
  }
}

export default Displayreply;
