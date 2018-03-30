import React, { Component } from "react";
import "./App.css";
import ChatLoader from "./ChatLoader";
import WithUser from "./WithUser";

class App extends Component {
  render() {
    return (
      <div className="App">
        <WithUser>{user => <ChatLoader username={user} />}</WithUser>
      </div>
    );
  }
}

export default App;
