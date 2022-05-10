import React, { Component } from 'react';
import Node from './node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { dfs } from '../algorithms/dfs';
import { bfs } from '../algorithms/bfs';

import './Visualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Visualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const grid = createInitialGrid();
        this.setState({ grid });
    }

    handleMouseDown(row, col) {
        //console.log("handleMouseDown");
    }

    handleMouseEnter(row, col) {
        //console.log("handleMouseEnter");
    }

    handleMouseUp() {
        //console.log("handleMouseUp");
    }

    handleClick(row, col) {
        console.log(row + " " + col);
        const newGrid = this.state.grid;
        const n = newGrid[row][col];
        n.nodeType="node-wall";
        newGrid[row][col] = n;
        this.setState({grid: newGrid});
    }

    animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    } 

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        console.log(finishNode.previousNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        console.log(finishNode.previousNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>
                    Visualize Dijkstra's Algorithm
                </button>
                <button onClick={() => this.visualizeDFS()}>
                    Visualize DFS Algorithm
                </button>
                <button onClick={() => this.visualizeBFS()}>
                    Visualize BFS Algorithm
                </button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, nodeType } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            nodeType={nodeType}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            onClick={() => this.handleClick(row, col)}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

}

const createInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        nodeType: getNodeType(col, row),
        distance: Infinity,
        previousNode: null,
    };
};

const getNodeType = (col, row) => {
    if (row === START_NODE_ROW && col === START_NODE_COL)
        return "node-start";
    if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
        return "node-finish";
    return "";
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}