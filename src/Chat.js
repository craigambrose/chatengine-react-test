import React, { Component } from "react";
import _ from "lodash";

import Message from "./Message";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      searchMessages: [],
      chatInput: "",
      loadingHistory: true
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
    const { room } = this.props;

    room.on("message", payload => {
      this.setState({
        messages: [...this.state.messages, payload]
      });
    });

    room
      .search({
        reverse: true,
        event: "message",
        limit: 100
      })
      .on("message", this.handleSearchMessage)
      .on("$.search.finish", this.handleSearchFinished);
  }

  handleMessage = payload => {
    this.setState({
      messages: [...this.state.messages, payload]
    });
  };

  handleSearchMessage = payload => {
    const searchMessages = this.state.searchMessages;
    searchMessages.push(payload);
    this.setState({ searchMessages });
  };

  handleSearchFinished = () => {
    const { messages, searchMessages } = this.state;
    this.setState({
      messages: searchMessages.reverse().concat(messages),
      searchMessages: [],
      loadingHistory: false
    });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.sendChat();
    }
  };

  render() {
    const { messages, loadingHistory } = this.state;
    const { room } = this.props;

    return (
      <div>
        <div className="row">
          <div className="users">
            {_.map(room.users, (user, key) => <div key={key}>{key}</div>)}
          </div>
          <div className="messages">
            {loadingHistory ? (
              <div>loading history...</div>
            ) : (
              <div id="chat-output">
                {messages.map(payload => (
                  <Message
                    key={payload.timetoken}
                    uuid={payload.sender.uuid}
                    text={payload.data.text}
                    me={payload.sender.name === "Me"}
                  />
                ))}
              </div>
            )}
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
