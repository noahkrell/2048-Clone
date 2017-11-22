
function Game() {
  this.boardStart = ([2, 2, 0, 4, 0, 2, 0, 0, 128, 4, 0, 8, 2, 256, 2, 0,]);
  this.rows = [$(".row1"), $(".row2"), $(".row3"), $(".row4")]
  this.cols = [$(".col1"), $(".col2"), $(".col3"), $(".col4")]
};

Game.prototype.render = function() {
  $(".cell").each(function(i) {
    $(this).text(game.boardStart[i])
  });
};

Game.prototype.changeColor = function() {
  $(".cell").each(function(i) {
    if ($(this).text() == "2") {
        $(this).css("background", "#eee4da")
      } else if ($(this).text() == "4") {
        $(this).css("background", "#ede0c8")
      } else  if ($(this).text() == "8") {
        $(this).css("background", " #f2b179")
      } else  if ($(this).text() == "16") {
        $(this).css("background", "#f59563")
      } else  if ($(this).text() == "32") {
        $(this).css("background", "#f67c5f")
      } else  if ($(this).text() == "64") {
        $(this).css("background", "#f65e3b")
      } else  if ($(this).text() == "128") {
        $(this).css("background", "#edcf72")
        // $(this).css("font-size", "50px")
      } else  if ($(this).text() == "256") {
        $(this).css("background", "#edcc61")
        // $(this).css("font-size", "50px")
        $(this).css("box-shadow", "0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)")
      } else  if ($(this).text() == "0") {
        $(this).css("background", "rgba(238, 228, 218, 0.35)")
        // $(this).css("color", "rgba(238, 228, 218, 0.35)")
      };
    });
  };

Game.prototype.spawnTwo = function() {
  var cells = $(".cell")
  for (var i = 0; i < cells.length; i++) {
    var randCell = cells[Math.floor(Math.random()*cells.length)];
    if (randCell.innerText === "0") {
      randCell.innerText = "2"
      { break; }
    };
  };
};

function isMerged(cell) {
  if (cell.classList.contains("merged")) {
    return true
  } else {
    return false
  }
}

function cleanSlate() {
  $(".merged").each(function() {
    $(this).removeClass("merged")
  })
}

Game.prototype.moveDown = function() {
  cleanSlate()
  for (var c = 0; c < this.cols.length; c++) { 
    for (var t = 1; t < 4; t++) {
      for (var r = 3; r >= 0; r--) {
        var currentCell = this.cols[c][r]
        var cellAbove = this.cols[c][r-1]
        var cellBelow = this.cols[c][r+1]
        if (!(this.cols[c][r].classList.contains("row1"))) {
          if ((currentCell.innerText === "0") && (cellAbove.innerText != "0")) {
            currentCell.innerText = cellAbove.innerText
            cellAbove.innerText = "0"
          } else if ((currentCell.innerText != "0") && (currentCell.innerText === cellAbove.innerText) && (isMerged(cellAbove) === false )) {
            currentCell.innerText = String(parseInt(currentCell.innerText) * 2)
            $(currentCell).addClass("merged")
            cellAbove.innerText = "0"
          };
        };
      };
    };
  };
};

Game.prototype.moveUp = function() {
  cleanSlate()
  for (var c = 0; c < this.cols.length; c++) { 
    for (var t = 1; t < 4; t++) {
      for (var r = 0; r <= 3; r++) {
        var currentCell = this.cols[c][r]
        var cellAbove = this.cols[c][r-1]
        var cellBelow = this.cols[c][r+1]
        if (!(this.cols[c][r].classList.contains("row4"))) {
          if ((currentCell.innerText === "0") && (cellBelow.innerText != "0")) {
            currentCell.innerText = cellBelow.innerText
            cellBelow.innerText = "0"
          } else if ((currentCell.innerText != "0") && (currentCell.innerText === cellBelow.innerText) && ((isMerged(cellBelow) === false) && (isMerged(currentCell) === false))) {
            currentCell.innerText = String(parseInt(currentCell.innerText) * 2)
            $(currentCell).addClass("merged")
            cellBelow.innerText = "0"
          };
        };
      };
    };
  };
};

Game.prototype.moveLeft = function() {
  cleanSlate()
  for (var r = 0; r < this.rows.length; r++) { 
    for (var t = 1; t < 4; t++) {
      for (var c = 0; c <= 3; c++) {
        var currentCell = this.rows[r][c]
        var cellLeft = this.rows[r][c-1]
        var cellRight = this.rows[r][c+1]
        if (!(this.rows[r][c].classList.contains("col4"))) {
          if ((currentCell.innerText === "0") && (cellRight.innerText != "0")) {
            currentCell.innerText = cellRight.innerText
            cellRight.innerText = "0"
          } else if ((currentCell.innerText != "0") && (currentCell.innerText === cellRight.innerText) && ((isMerged(cellRight) === false) && (isMerged(currentCell) === false))) {
            currentCell.innerText = String(parseInt(currentCell.innerText) * 2)
            $(currentCell).addClass("merged")
            cellRight.innerText = "0"
          };
        };
      };
    };
  };
};

Game.prototype.moveRight = function() {
  cleanSlate()
  for (var r = 0; r < this.rows.length; r++) { 
    for (var t = 1; t < 4; t++) {
      for (var c = 3; c >= 0; c--) {
        var currentCell = this.rows[r][c]
        var cellLeft = this.rows[r][c-1]
        var cellRight = this.rows[r][c+1]
        if (!(this.rows[r][c].classList.contains("col1"))) {
          if ((currentCell.innerText === "0") && (cellLeft.innerText != "0")) {
            currentCell.innerText = cellLeft.innerText
            cellLeft.innerText = "0"
          } else if ((currentCell.innerText != "0") && (currentCell.innerText === cellLeft.innerText) && ((isMerged(cellLeft) === false) && (isMerged(currentCell) === false))) {
            currentCell.innerText = String(parseInt(currentCell.innerText) * 2)
            $(currentCell).addClass("merged")
            cellLeft.innerText = "0"
          };
        };
      };
    };
  };
};


Mousetrap.bind('up', function() {
  game.moveUp()
  game.spawnTwo()
  game.changeColor()
});

Mousetrap.bind('down', function() {
  game.moveDown()
  game.spawnTwo()
  game.changeColor()
});

Mousetrap.bind('left', function() {
  game.moveLeft()
  game.spawnTwo()
  game.changeColor()
});

Mousetrap.bind('right', function() {
  game.moveRight()
  game.spawnTwo()
  game.changeColor()
});



