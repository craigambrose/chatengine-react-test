import React, { Component } from "react";
import ChatEngineCore from "chat-engine";

import Chat from "./Chat";

const getUsername = () => {
  const animals = [
    "pigeon",
    "seagull",
    "bat",
    "owl",
    "sparrows",
    "robin",
    "bluebird",
    "cardinal",
    "gary"
  ];

  return animals[Math.floor(Math.random() * animals.length)];
};
const username = getUsername();

const ChatEngine = ChatEngineCore.create({
  publishKey: "pub-c-e2eee1b9-e6b7-4bd3-9503-41c5b9fdc3d6",
  subscribeKey: "sub-c-3e4f9758-339c-11e8-a6a1-9a016222f7eb"
});

export default class ChatLoader extends Component {
  constructor() {
    super();
    this.state = { room: null };
  }

  componentDidMount() {
    const { username } = this.props;

    // In reality auth key would be fetch from shepherd for the user
    const authKey = username;

    ChatEngine.connect(
      username,
      {
        signedOnTime: new Date().getTime()
      },
      authKey
    );

    ChatEngine.on("$.ready", data => {
      let me = data.me;
      console.log("chat engine ready. me = ", me);
      const room = new ChatEngine.Chat("privateroom2", true);

      console.log("room", room);

      this.setState({ room });
    });

    ChatEngine.onAny((event, payload) => {
      console.log("All events trigger this.", event, payload);
    });
  }

  render() {
    const { room } = this.state;

    if (room) {
      return <Chat room={room} />;
    } else {
      return <div>loading chat room...</div>;
    }
  }
}
