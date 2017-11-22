$(document).ready(function() {

  game = new Game()
  $("#new-game-button").on('click', function() {
    console.log("new game started!")
    game.render()
    game.changeColor()
  });
  
});
