import React, { Component } from "react";
import SelectUser from "./SelectUser";

export default class WithUser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  render() {
    const { user } = this.state;

    if (user) {
      return this.props.children(user);
    } else {
      return <SelectUser onSubmit={name => this.setState({ user: name })} />;
    }
  }
}
