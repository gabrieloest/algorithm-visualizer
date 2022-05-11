import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  
  render() {
    const {
      col,
      nodeType,
      weight,
      onClick,
      row,
    } = this.props;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${nodeType}`}
        onClick={() => onClick()}>
            {weight}
        </div>
    );
  }
}