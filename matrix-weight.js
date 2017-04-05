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

/**
 * Find the path of through a matrix with a minimum weight.
 * 
 * The path starts at the top and ends at the bottom, and its weight is calculated
 * by adding up the values of the squares within the matrix visited along the way.
 * The return value is an array that contains the values that make up the
 * minimum weight path. 0-valued, 0 = top of matrix.
 * 
 * @param {Array} matrix The matrix to find a path for
 * @returns {Array} containing the path
 */
function findPath(matrix) {
  const weights = buildWeightMatrix(matrix);
  const rowCount = matrix.length;

  var path = [];

  // Find the position of the minimum weight at the bottom of the weight matrix
  var col = findPositionOfSmallest(weights[rowCount - 1]);
  path[rowCount - 1] = matrix[rowCount - 1][col];

  for (var row = rowCount - 2; row >= 0; row--) {
    col = findColumnPositionInRow(weights, row, col);
    path[row] = matrix[row][col];
  }

  return path;
}

/**
 * Find the column position of the next path value.
 * 
 * Here, we're in the middle of searching the weights matrix for the next path
 * value. The passed in row is already the row above the last found value.
 * We'll check the left, same, and right column values. We'll return the position
 * of the minimum value of those three.
 * 
 * @param {Array} weights a matrix of computed weights
 * @param {int} row the row to check
 * @param {int} col the col to check
 */
function findColumnPositionInRow(weights, row, col) {
  // set the min / position to the square right above the previous minimum
  var min = weights[row][col];
  var position = col;

  // check if the left is smaller
  if (col > 0 && weights[row][col - 1] < min) {
    min = weights[row][col - 1];
    position = col - 1;
  }

  // check if the right is smaller
  if (col < weights[0].length - 1 && weights[row][col + 1] < min) {
    position = col + 1;
  }

  return position;
}

/**
 * Find the position in the array of the smallest value.
 * 
 * This is used for the bottom most row of the weights matrix.
 * 
 * @param {Array} arr 
 * @returns {int} the array position of the smallest value in the array
 */
function findPositionOfSmallest(arr) {
  var minPosition = 0;
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      minPosition = i;
    }
  }
  return minPosition;
}

exports.buildWeightMatrix = buildWeightMatrix;
exports.findPath = findPath;
