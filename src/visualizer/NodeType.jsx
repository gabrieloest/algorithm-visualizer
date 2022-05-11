import React, { Component } from "react";

export default class NodeType extends Component {
  render() {
    const {
      onChange,
    } = this.props;
    return (
      <div onChange={() => onChange()}>
        <input type="radio" value="Start" name="nodeType" /> Start
        <input type="radio" value="Wall" name="nodeType" /> Wall
        <input type="radio" value="End" name="nodeType" /> End
      </div>
    );
  }
}