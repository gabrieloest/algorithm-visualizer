export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.isVisited = true;
    const queue = [startNode];
    while(queue.length > 0){
        const current = queue.shift();

        if (current.nodeType === "node-wall") continue;

        visitedNodesInOrder.push(current);

        if (current === finishNode) return visitedNodesInOrder;
        
        for(let neighbor of getUnvisitedNeighbors(current, grid)){
            neighbor.isVisited = true;        
            neighbor.previousNode = current;
            queue.push(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && neighbor.previousNode === null);
  }