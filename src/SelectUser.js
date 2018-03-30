import React, { Component } from "react";

export default class SelectUser extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onSubmit = event => {
    const { name } = this.state;
    if (name) {
      this.props.onSubmit(name);
    }
  };

  render() {
    const { name } = this.state;

    return (
      <div className="central-form">
        <h2>Set username</h2>
        <input type="text" value={name} onChange={this.onNameChange} />
        <p>
          <input type="submit" onClick={this.onSubmit} />
        </p>
      </div>
    );
  }
}
