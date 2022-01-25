//alert(`hello~`);

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


// Checks if game has started
let gameStart = false;
let level = 0;
$(document).keydown(function () {
  if (!gameStart) {

    $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStart = true; // initializes game
  }
});


// Next Game Sequence
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
  playSound(randomChosenColor);
}


// Check user click against pc
function checkClick(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log(`correct`);
    
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

    } else {
      console.log(`wrong`);

      let wrongClick = new Audio(`sounds/wrong.mp3`);
      wrongClick.play();

      $(`body`).addClass("game-over");
      setTimeout(function () {
        $(`body`).removeClass("game-over");
      }, 200);
      $(`#level-title`).text(`Game Over, Press Any Key to Restart`);
    
      restart();
    }
}


// Restarts the game
function restart() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}


// Detects clicks
$(".btn").click(function () {

  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkClick(userClickedPattern.length - 1);
});


// Plays sound
function playSound(name) {

  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}


// Animate buttons that are pressed
function animatePress(currentColor) {

  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}
