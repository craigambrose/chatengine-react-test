import React, { Component } from "react";
import Chat from "./Chat";

export default class RoomLoader extends Component {
  constructor() {
    super();
    this.state = { room: null };
  }

  componentDidMount() {
    const { engine } = this.props;

    const room = new engine.Chat("private4", true);
    room.on("$.connected", () => {
      this.setState({ room });
    });
  }

  render() {
    const { room } = this.state;

    if (room) {
      return <Chat room={room} />;
    } else {
      return <div>loading room...</div>;
    }
  }
}
