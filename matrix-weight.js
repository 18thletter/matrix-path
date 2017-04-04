/**
 * Compute a matrix of pre-computed weights.
 * 
 * Compute the weights of every single point on the matrix so that we can later go
 * through and pick out a path. This is a dynamic programming technique.
 * 
 * @param {Array} matrix 
 * @returns {Array} containing weights, where each "weight" is the minimum
 *  path length required at each specific cell (the path coming from the
 *  top row to the bottom row)
 */
function buildWeightMatrix(matrix) {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  var weights = [];
  // the first row can be copied verbatim
  weights[0] = matrix[0];
  for (var row = 1; row < rowCount; row++) {
    weights[row] = [];
    for (var col = 0; col < colCount; col++) {
      weights[row][col] = matrix[row][col] + findMinWeightAbove(weights, row, col);
    }
  }
  return weights;
}

/**
 * Check the row above row, col and find the minimum.
 * 
 * Since we're pre-computing minimum weights as we traverse the matrix, we need
 * to compare the possible paths from the current row and col (indicated by row
 * and col parameters). The possible paths are the top left, top, and top right
 * positions, if available of course. We'll check the top left, top, and top right
 * and return the smallest value.
 *
 * @param {Array} weightMatrix the weight matrix
 * @param {int} row the row we're checking
 * @param {int} col the column we're checking
 * @returns {int} the smallest value of the adjacent top row
 */
function findMinWeightAbove(weightMatrix, row, col) {
  // if we're on the very left
  if (col === 0) {
    return Math.min(weightMatrix[row - 1][col], weightMatrix[row - 1][col + 1]);
  }
  // if we're on the very right
  if (col === weightMatrix[0].length - 1) {
    return Math.min(weightMatrix[row - 1][col - 1], weightMatrix[row - 1][col]);
  }
  return Math.min(weightMatrix[row - 1][col - 1], weightMatrix[row - 1][col], weightMatrix[row - 1][col + 1]);
}

exports.buildWeightMatrix = buildWeightMatrix;
