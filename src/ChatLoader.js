import React, { Component } from "react";
import ChatEngineCore from "chat-engine";

import RoomLoader from "./RoomLoader";

export default class ChatLoader extends Component {
  constructor() {
    super();
    this.state = { engine: null };
  }

  componentDidMount() {
    const { username } = this.props;

    // In reality auth key would be fetch from shepherd for the user
    const authKey = username;

    const ChatEngine = ChatEngineCore.create({
      publishKey: "pub-c-e2eee1b9-e6b7-4bd3-9503-41c5b9fdc3d6",
      subscribeKey: "sub-c-3e4f9758-339c-11e8-a6a1-9a016222f7eb"
      // secretKey: "sec-c-OWZjNDljOTAtMTJjNy00NWM3LTgwYjAtOThjY2Q0YWM2YmZj"
    });

    ChatEngine.connect(
      username,
      {
        signedOnTime: new Date().getTime()
      },
      authKey
    );

    ChatEngine.on("$.ready", data => {
      this.setState({ engine: ChatEngine });
    });

    ChatEngine.onAny((event, payload) => {
      console.log("All events trigger this.", event, payload);
    });
  }

  render() {
    const { engine } = this.state;

    if (engine) {
      return <RoomLoader engine={engine} />;
    } else {
      return <div>loading chat engine...</div>;
    }
  }
}
