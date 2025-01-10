var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start the game on keypress
document.addEventListener("keydown", function () {
  if (!started) {
    document.getElementById("level-title").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Handle button clicks
var buttons = document.querySelectorAll(".btn");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
}

// Generate the next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  setTimeout(function () {
    document.getElementById(randomChosenColor).classList.add("pressed");
    playSound(randomChosenColor);
    setTimeout(function () {
      document.getElementById(randomChosenColor).classList.remove("pressed");
    }, 100);
  }, 500);
}

// Check the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(function () {
      document.body.classList.remove("game-over");
    }, 200);

    document.getElementById("level-title").innerHTML = "Game Over, Press Any Key to Restart";
    startOver();
  }
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColor) {
  var activeButton = document.getElementById(currentColor);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
