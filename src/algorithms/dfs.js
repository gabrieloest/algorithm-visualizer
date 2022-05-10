export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.isVisited = true;
    const stack = [startNode];
    while (stack.length > 0) {
        const current = stack.pop();
        current.isVisited = true;
        visitedNodesInOrder.push(current);

        if (current === finishNode) return visitedNodesInOrder;

        for (let neighbor of getUnvisitedNeighbors(current, grid)) {
            neighbor.previousNode = current;
            stack.push(neighbor);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && neighbor.nodeType !== "node-wall");
}