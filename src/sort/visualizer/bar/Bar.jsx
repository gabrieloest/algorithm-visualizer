import React, { Component } from 'react';

import './Bar.css';

const PRIMARY_COLOR = 'turquoise';

export default class Bar extends Component {

  render() {
    const {
      index,
      size,
    } = this.props;
    return (
      <div
        className="array-bar"
        key={index}
        style={{
          backgroundColor: PRIMARY_COLOR,
          height: `${size}px`,
        }}></div>
    );
  }
}