
function Game() {
  this.boardStart = ([1024, 1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
  this.rows = [$(".row1"), $(".row2"), $(".row3"), $(".row4")]
  this.cols = [$(".col1"), $(".col2"), $(".col3"), $(".col4")]
};

function resetColors() {
  $('.a0, .a2, .a4, .a8, .a16, .a32, .a64, .a128, .a256, .a512, .a1024, .a2048').removeClass('a0 a2 a4 a8 a16 a32 a64 a128 a256 a512 a1024 a2048');
}
function addJello() {
  $(".cell").addClass("jello")
}
function removeJello() {
  $(".cell").removeClass("jello")
}

Game.prototype.checkForGameOver = function() {
  $(".cell").each(function() {
    if ($(this).text() == "2048") {
      alert("YOU WIN! Click okay to view the final board. You can continue playing, or hit New Game to reset.")
    };
  });
};

Game.prototype.render = function() {
  $(".cell").each(function(i) {
    $(this).text(game.boardStart[i])
  });
};

Game.prototype.changeColor = function() {
  resetColors()
  $(".cell").each(function(i) {
    if ($(this).text() == "2") {
        $(this).addClass("a2");
      } else if ($(this).text() == "4") {
        $(this).addClass("a4");
      } else if ($(this).text() == "8") {
        $(this).addClass("a8");
      } else if ($(this).text() == "16") {
        $(this).addClass("a16");
      } else if ($(this).text() == "32") {
        $(this).addClass("a32");
      } else if ($(this).text() == "64") {
        $(this).addClass("a64");
      } else if ($(this).text() == "128") {
        $(this).addClass("a128");
      } else if ($(this).text() == "256") {
        $(this).addClass("a256");
      } else if ($(this).text() == "512") {
        $(this).addClass("a512");
      } else if ($(this).text() == "1024") {
        $(this).addClass("a1024");
      } else if ($(this).text() == "2048") {
        $(this).addClass("a2048");
      } else if ($(this).text() == "0") {
        $(this).addClass("a0");
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
    return true;
  } else {
    return false;
  };
};

function cleanSlate() {
  $(".merged").each(function() {
    $(this).removeClass("merged");
  });
};

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
  removeJello();
  game.moveUp();
  game.spawnTwo();
  game.changeColor();
  addJello();
  game.checkForGameOver();
});

Mousetrap.bind('down', function() {
  removeJello();
  game.moveDown();
  game.spawnTwo();
  game.changeColor();
  addJello();
  game.checkForGameOver();
});

Mousetrap.bind('left', function() {
  removeJello();
  game.moveLeft();
  game.spawnTwo();
  game.changeColor();
  addJello();
  game.checkForGameOver();
});

Mousetrap.bind('right', function() {
  removeJello();
  game.moveRight();
  game.spawnTwo();
  game.changeColor();
  addJello();
  game.checkForGameOver();
});
