var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenCoulour = buttonColours[randomNumber];
  gamePattern.push(randomChosenCoulour);
  $(`#${randomChosenCoulour}`).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenCoulour);
  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  playSound("wrong");
  $(`body`).addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text(`Game Over, Press Any Key to Restart`);
  isStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  for (var i = 0; i < currentLevel; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      gameOver();
      break;
    }
  }

  if (currentLevel === userClickedPattern.length && isStarted) {
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}

$("body").keypress(function () {
  if (!isStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    isStarted = true;
  }
});

$(".btn").on("click", function () {
  if (isStarted) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if (userClickedPattern.length === gamePattern.length) {
      checkAnswer(gamePattern.length);
    }
  }
});
