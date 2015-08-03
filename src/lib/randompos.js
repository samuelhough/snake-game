var randomPos = function(boardStats, useMid){
  var rowRange = boardStats.rows,
      colRange = boardStats.columns,
      row, col, addRow = 0, addCol = 0;

  if(useMid){
    rowRange = Math.floor(boardStats.rows / 2);
    colRange = Math.floor(boardStats.columns / 2);
    addRow = 5;
    addCol = 5;
  }

  row = Math.floor(Math.random() * rowRange) + addRow;
  col = Math.floor(Math.random() * colRange) + addCol;
  return [row,col];
}

module.exports = randomPos;