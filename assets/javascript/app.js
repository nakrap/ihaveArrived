// Initialize Firebase
var config = {
  apiKey: "AIzaSyBPH6H536ccjgr9M48YunIT1tkMaYDJaUo",
  authDomain: "ihavearrived-e9123.firebaseapp.com",
  databaseURL: "https://ihavearrived-e9123.firebaseio.com",
  projectId: "ihavearrived-e9123",
  storageBucket: "ihavearrived-e9123.appspot.com",
  messagingSenderId: "393004989891"};

firebase.initializeApp(config);

var database = firebase.database();
var chatData = database.ref("/chat");
var playersRef = database.ref("players");
var currentTurnRef = database.ref("turn");
var username = "Guest";
var currentPlayers = null;
var currentTurn = null;
var playerNum = false;
var playerOneExists = false;
var playerTwoExists = false;
var playerOneData = null;
var playerTwoData = null;


// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// USERNAME LISTENERS
// Sets up start button to click and add user in app.
$("#start").click(function() {
  if ($("#username, #email").val() !== "") {
		username = capitalize($("#username").val());
		email = $("#email").val();
    getInGame();
  } 
});

// Allows enter to submit user as well.
$("#username, #email").keypress(function(e) {
  if (e.which === 13 && $("#username, #email").val() !== "") {
		username = capitalize($("#username").val());
		email = $("#email").val();
    getInGame();
  }
});

// Capitalizes user names.
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------









// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Gets chat working.
$("#chat-send").click(function() {

  if ($("#chat-input").val() !== "") {

    var message = $("#chat-input").val();

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    $("#chat-input").val("");
  }
});


$("#chat-input").keypress(function(e) {

  if (e.which === 13 && $("#chat-input").val() !== "") {

    var message = $("#chat-input").val();

    chatData.push({
      name: username,
      message: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      idNum: playerNum
    });

    $("#chat-input").val("");
  }
});
  
// Click event for our ihaveArrived button and onTheWay button.
  $(document).on("click", "li", function() {

    if(currentTurn==1){
    window.frames[0].location = "location.html";
    }
    if(currentTurn==2){
    window.frames[0].location = "detail.html";
    }

    var clickChoice = $(this).text();

    // Logs choice to current user.
    playerRef.child("choice").set(clickChoice);

    // Displays the status of the user.
    $("#player" + playerNum + " ul").empty();
    $("#player" + playerNum + "chosen").text(clickChoice);

    // Changes the turn to keep everything working in sequential order. 
    // First both users have to be logged in. 
    // Next user 1 (host) clicks the button ihaveArrived, and sets the status.
    // Next user 2 (guest) clicks the button onTheWay, and sets the status.
    // Finally both coordinates are sent to directions API and shows map.
    currentTurnRef.transaction(function(turn) {
      return turn + 1;
    });
  });

// Update chat.
chatData.orderByChild("time").on("child_added", function(snapshot) {

  // Disconnect a user if there is no one there.
  if (snapshot.val().idNum === 0) {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }
  else {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }

  $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------








// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Tracking changes.
playersRef.on("value", function(snapshot) {

  currentPlayers = snapshot.numChildren();

  // Check to make sure users are logged in.
  playerOneExists = snapshot.child("1").exists();
  playerTwoExists = snapshot.child("2").exists();

  playerOneData = snapshot.child("1").val();
  playerTwoData = snapshot.child("2").val();

  // Logic to show if users are in, and what to do next.
  if (playerOneExists) {
		$("#player1-name").text(playerOneData.name);
		$("#player2-status").text("Waiting for Guest...");
  }
  else {
    $("#player1-name").text("Waiting for Host...");
  }
  if (playerTwoExists) {
		$("#player2-name").text(playerTwoData.name);
		$("#player1-status").text(playerOneData.status);
  }
  else {

    $("#player2-name").text("Waiting for Guest...");
  }
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Tracks changes.
currentTurnRef.on("value", function(snapshot) {

  currentTurn = snapshot.val();

  if (playerNum) {

    if (currentTurn === 1) {

      if (currentTurn === playerNum) {
				$("#current-turn").html("<h4>Click the button below to let your friends know where you are!</h4>");
				// Host button
					var a = $("<button>");
					// Adding a class to our button
					a.addClass("arrivedButton");
					// Adding a data-attribute
					a.attr("data-name",);
					// Providing the initial button text
					a.text("I have arrived");
					// Adding the button to the buttons-view div
					$("#player1-buttons").append(a);
      }
      else {
        $("#current-turn").html("<h4>Waiting for " + playerOneData.name + " to arrive.</h4>");
      }

      // Shows red border around active user.
      $("#player1").css({
					"border": "5px solid red", 
					"border-radius": "15px",
					"box-shadow": "20px 20px 50px grey",
			});
      $("#player2").css({
					"border": "2px solid black", 
					"border-radius": "15px",
					"box-shadow": "20px 20px 50px grey",
			});
    }

    else if (currentTurn === 2) {
      if (currentTurn === playerNum) {
				$("#current-turn").html("<h4>It's Your Turn! Click the button below to let you friends know you're on your way.</h4>");
				//Guest Button
					var b = $("<button>");
					b.addClass("onTheWay");
					b.attr("id", "onWay");
					b.text("On the Way");
					$("#player2-buttons").append(b)
      }
      else {
        $("#current-turn").html("<h4>Waiting for " + playerTwoData.name + " to be on the way.</h4>");
      }

			// Shows red border around active user.
      $("#player2").css({
					"border": "5px solid red", 
					"border-radius": "15px",
					"box-shadow": "20px 20px 50px grey",
			});
			$("#player1").css({
					"border": "2px solid black", 
					"border-radius": "15px",
					"box-shadow": "20px 20px 50px grey",
			});
    }

    else if (currentTurn === 3) {
    gameLogic(playerOneData.choice, playerTwoData.choice);

      // Finish by showing both player statuses.
      $("#player1-chosen").text(playerOneData.choice);
			$("#player2-chosen").text(playerTwoData.choice);
    }
    
    else {
      $("#player1 ul").empty();
      $("#player2 ul").empty();
      $("#current-turn").html("<h4>Waiting for another user to join.</h4>");
      $("#player2").css("border", "2px solid black");
      $("#player1").css("border", "2px solid black");
    }
  }
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// When a player joins, checks to see if there are two players now. If yes, then it will start the game.
playersRef.on("child_added", function(snapshot) {
  if (currentPlayers === 1) {
    //Set turn to 1, which starts the whole app.
    currentTurnRef.set(1);
  }
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------









// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Adds users to the app.
function getInGame() {

  var chatDataDisc = database.ref("/chat/" + Date.now());
  if (currentPlayers < 2) {
    if (playerOneExists) {
      playerNum = 2;
    }
    else {
      playerNum = 1;
    }

    playerRef = database.ref("/players/" + playerNum);
		var newEmail = $("#email").val().trim();

    playerRef.update({
      name: username,
			email: newEmail,
      choice: null
		});

    playerRef.onDisconnect().remove();

    currentTurnRef.onDisconnect().remove();

    chatDataDisc.onDisconnect().set({
      name: username,
      time: firebase.database.ServerValue.TIMESTAMP,
      message: "has left.",
      idNum: 0
		});

		$("#swap-zone").html("<h4>Hello " + username + "! Welcome to the <strong>ihaveArrived</strong> Dashboard.</h4>");
  }
};

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// This explains the actual logic that happens to finish up the app.
function gameLogic(player1choice, player2choice) {
  var playerOneWon = function() {
    $("#result").html("<h4>" + playerOneData.name + "</h4><h4> has arrived!</h4>");
  };

  var playerTwoWon = function() {
    $("#result").html("<h4>" + playerTwoData.name + "</h4><h4> is on the way!</h4>");
  };

  var ARRIVED = function() {
    $("#result").html("<h4>Congratulations! You met up!</h4>");
		// showButtons();
  };

  if (player1choice === "I have arrived" && player2choice === "On the Way") {
    $("#swap-zone").html("<h4>Follow the directions to each other!</h4>");
    $("#current-turn").empty();
    $("#player1-chosen").text("<h4>playerOneData.choice</h4>");
    $("#player2-chosen").text("<h4>playerTwoData.choice</h4>");

    ARRIVED();
  }
}

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

function showButtons () { 
	$('#arrived').show(); 
};

$('#arrived').submit('click', function() {
	playersRef.remove();
	$('#player-zone').empty();
	$('#user-create').show();
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------