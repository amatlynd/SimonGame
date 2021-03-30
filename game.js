var gamePattern = [];
var userPatternList = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;


//Initialization

$(document).keydown( () => {
  startGame();
})

for (var i = 0; i < buttonColours.length; i++) {
  buttonClick(buttonColours[i]);
}

//Button click

function buttonClick(colour) {
  var buttonId = "#" + colour;
  var buttonColour = colour;
  $(buttonId).click( () => {
    animateButtonPress(buttonId);
    playButtonSound(buttonColour);
    userPatternList.push(colour);
    if (checkAnswer(userPatternList.length - 1)) {
      if (userPatternList.length === gamePattern.length) {
        userPatternList = [];
        setTimeout(() => {nextSequence();}, 1000);
      }
    } else {
      gameOver();
    }
  })
}


// Animations

function animateButton(id) {
    $(id).fadeOut(100).fadeIn(100);
}

function animateButtonPress(id) {
  $(id).addClass("pressed");
  setInterval( () => {
    $(id).removeClass("pressed");
  },150);

}

function gameOverAnimation() {
  $("body").addClass("game-over");
  setInterval( () => {
    $("body").removeClass("game-over");
  },150);
}


// Sound

function playButtonSound(button) {
  var audio = new Audio("sounds/" + button + ".mp3")
  audio.play();
}

function gameOverSound(){
  var audio = new Audio("sounds/wrong.mp3")
  audio.play();
}


// Game Logic

 function checkAnswer(currentLevel) {
   if (userPatternList[currentLevel] === gamePattern[currentLevel]) {
     return true;
   } else {
     return false;
   }
 }

 //Game State

 function startGame() {
   if (!gameStarted) {
     nextSequence();
     gameStarted = true;
   }
 }

 function gameOver(){
   gameOverAnimation();
   gameOverSound();
   $("#level-title").text("Game over, Press A Key To Restart");
   restartGame();
 }

function restartGame() {
  gamePattern = [];
  userPatternList = [];
  level = 0;
  gameStarted = false;
}

 function nextSequence() {
   var randomNumber = Math.floor(Math.random()*3);
   var randomChosenColour = buttonColours[randomNumber];
   var randomChosenColourId = "#" + randomChosenColour;

   level++;
   $("#level-title").text("Level " + level);
   playButtonSound(randomChosenColour);
   animateButton(randomChosenColourId);
   gamePattern.push(randomChosenColour);
 }
