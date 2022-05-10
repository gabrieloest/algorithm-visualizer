import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  
  render() {
    const {
      col,
      nodeType,
      weight,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onClick,
      row,
    } = this.props;
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${nodeType}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onClick={() => onClick()}>

            {weight}
        </div>
    );
  }
}