import React, { Component } from "react";
import _ from "lodash";

import Message from "./Message";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      chatInput: ""
    };
  }

  setChatInput = event => {
    this.setState({ chatInput: event.target.value });
  };

  sendChat = () => {
    if (this.state.chatInput) {
      this.props.room.emit("message", {
        text: this.state.chatInput
      });

      this.setState({ chatInput: "" });
    }
  };

  componentDidMount() {
    this.props.room.on("message", payload => {
      console.log("got message", payload);
      let messages = this.state.messages;
      this.setState({
        messages: [...this.state.messages, payload]
      });
    });
  }

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendChat();
    }
  };

  render() {
    const { messages } = this.state;
    const { room } = this.props;

    return (
      <div>
        <div className="row">
          <div className="users">
            {_.map(room.users, (user, key) => <div key={key}>{key}</div>)}
          </div>
          <div className="messages">
            <div id="chat-output">
              {messages.map(payload => (
                <Message
                  key={payload.timetoken}
                  uuid={payload.sender.uuid}
                  text={payload.data.text}
                  me={payload.sender.name == "Me"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="post-box">
          <input
            id="chat-input"
            type="text"
            name=""
            value={this.state.chatInput}
            onChange={this.setChatInput}
            onKeyPress={this._handleKeyPress}
          />{" "}
          <input type="button" onClick={this.sendChat} value="Send Chat" />
        </div>
      </div>
    );
  }
}
