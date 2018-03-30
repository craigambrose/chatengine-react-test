import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const { uuid, text, me } = this.props;
    let styles = {};
    if (me) {
      styles.fontWeight = "bold";
    }

    return (
      <div className="message" style={styles}>
        {uuid}: {text}{" "}
      </div>
    );
  }
}
