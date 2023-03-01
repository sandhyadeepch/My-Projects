
//Array of colors we use in game
var buttonColours=["red", "blue", "green", "yellow"];
//Array to store the random pattern of colors
var gamePattern=[];
//Array to store the user clicked pattern of colors
var userClickedPattern=[];

//Variable to update the title ccording to levels
var level=0;
//Boolean to check if the game started
var started=false;

//Choose random color to animate
function nextSequence(){
  userClickedPattern=[];
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

//Button click to play sound
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Play sound based on color
function playSound(name){
  var playAudio=new Audio("sounds/"+name+".mp3");
  playAudio.play();
}

//Animation for the button clicked
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

//Detect keypress to start the game for first time
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

//Check user chosen pattern matches the game pattern
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    //console.log("Success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
    else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
    }
}
//Restart the game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
