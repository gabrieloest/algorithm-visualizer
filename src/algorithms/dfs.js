export function dfs(grid, startNode, finishNode, visitedNodesInOrder = []) {
    startNode.isVisited = true;
    visitedNodesInOrder.push(startNode);
    if (startNode === finishNode) return visitedNodesInOrder;

    for (let neighbor of getUnvisitedNeighbors(startNode, grid)) {
        neighbor.previousNode = startNode;
        return dfs(grid, neighbor, finishNode, visitedNodesInOrder)
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && neighbor.nodeType !== "node-wall");
}