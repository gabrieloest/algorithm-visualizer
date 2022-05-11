import React, { Component } from 'react';
import Node from './node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { dfs } from '../algorithms/dfs';
import { bfs } from '../algorithms/bfs';

import './Visualizer.css';

const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class Visualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            selectedOption: "Start",
            startNodeRow: 1,
            startNodeCol: 1,
            finishNodeRow: 10,
            finishNodeCol: 35,
        };
    }

    componentDidMount() {
        const grid = createInitialGrid();
        this.setState({ grid });
    }

    handleClick(row, col) {
        const newGrid = this.state.grid;

        if(this.state.selectedOption === "Start"){
            newGrid[this.state.startNodeRow][this.state.startNodeCol].nodeType="";
            this.setState({ startNodeRow: row, startNodeCol: col});
        }
        if(this.state.selectedOption === "End"){
            newGrid[this.state.finishNodeRow][this.state.finishNodeCol].nodeType="";
            this.setState({ finishNodeRow: row, finishNodeCol: col});
        }

        const updatedNode = newGrid[row][col];
        updatedNode.nodeType = getNodeSelecetedType(this.state.selectedOption);
        newGrid[row][col] = updatedNode;
        this.setState({ grid: newGrid });
    }

    onChangeValue = (event) => {
        this.setState({
            selectedOption: event.target.value
          });
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

    visualizeDijkstra = () => {
        const { grid } = this.state;
        const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
        const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeDFS = () => {
        const { grid } = this.state;
        const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
        const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
        const visitedNodesInOrder = dfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS = () => {
        const { grid } = this.state;
        const startNode = grid[this.state.startNodeRow][this.state.startNodeCol];
        const finishNode = grid[this.state.finishNodeRow][this.state.finishNodeCol];
        const visitedNodesInOrder = bfs(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateVisualizer(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const { grid } = this.state;

        return (
            <>
                <div>
                    <button onClick={() => this.visualizeDijkstra()}>
                        Visualize Dijkstra's Algorithm
                    </button>
                    <button onClick={() => this.visualizeDFS()}>
                        Visualize DFS Algorithm
                    </button>
                    <button onClick={() => this.visualizeBFS()}>
                        Visualize BFS Algorithm
                    </button>
                </div>

                <div>
                    <div className="radio">
                        <input type="radio" value="Start" name="nodeType" checked={this.state.selectedOption === "Start"}
                            onChange={this.onChangeValue} /> Start
                        <input type="radio" value="Wall" name="nodeType" checked={this.state.selectedOption === "Wall"}
                            onChange={this.onChangeValue} /> Wall
                        <input type="radio" value="End" name="nodeType" checked={this.state.selectedOption === "End"}
                            onChange={this.onChangeValue} /> End
                    </div>
                    <div>
                        Selected option is : {this.state.selectedOption}
                    </div>
                </div>

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

const getNodeSelecetedType = (selectedOption) => {
    if (selectedOption === "Start")
        return "node-start";
    if (selectedOption === "End")
        return "node-finish";
    if (selectedOption === "Wall")
        return "node-wall";
    return "";
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}