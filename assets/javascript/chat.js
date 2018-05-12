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
// Start button - takes username and tries to get user in game
$("#start").click(function() {
  if ($("#username, #email").val() !== "") {
		username = capitalize($("#username").val());
		email = $("#email").val();
    getInGame();
  }
});

// listener for 'enter' in username input
$("#username, #email").keypress(function(e) {
  if (e.which === 13 && $("#username, #email").val() !== "") {
		username = capitalize($("#username").val());
		email = $("#email").val();
    getInGame();
  }
});

// Function to capitalize usernames
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------






// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// //buttons
// var a = $("<button>");
// // Adding a class to our button
// a.addClass("arrivedButton");
// // Adding a data-attribute
// a.attr("data-name", );
// // Providing the initial button text
// a.text("I have arrived");
// // Adding the button to the buttons-view div
// $("#player1-buttons").append(a);

// //buttons
// var b = $("<button>");

// b.addClass("onTheWay");

// b.attr("id", "onWay" );

// b.text("On the Way");

// $("#player2-buttons").append(b)

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// CHAT LISTENERS
// Chat send button listener, grabs input and pushes to firebase. (Firebase's push automatically creates a unique key)
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

// Chatbox input listener

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
																														// Click event for dynamically added <li> elements
																														$(document).on("click", "li", function() {
                                                
                                                              console.log(currentTurn);
                                                              if(currentTurn==1){
                                                              window.frames[0].location = "location.html";
                                                              }
                                                              if(currentTurn==2){
                                                              window.frames[0].location = "detail.html";
                                                              }

																															// console.log("click");

																															// Grabs text from li choice
																															var clickChoice = $(this).text();
																															// console.log(playerRef);

																															// Sets the choice in the current player object in firebase
																															playerRef.child("choice").set(clickChoice);

																															// User has chosen, so removes choices and displays what they chose
																															$("#player" + playerNum + " ul").empty();
																															$("#player" + playerNum + "chosen").text(clickChoice);

																															// Increments turn. Turn goes from:
																															// 1 - player 1
																															// 2 - player 2
																															// 3 - determine winner
																															currentTurnRef.transaction(function(turn) {
																																return turn + 1;
																															});
																														});

// Update chat on screen when new message detected - ordered by 'time' value
chatData.orderByChild("time").on("child_added", function(snapshot) {

  // If idNum is 0, then its a disconnect message and displays accordingly
  // If not - its a user chat message
  if (snapshot.val().idNum === 0) {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }
  else {
    $("#chat-messages").append("<p class=player" + snapshot.val().idNum + "><span>"
    + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");
  }

  // Keeps div scrolled to bottom on each update.
  $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------








// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Tracks changes in key which contains player objects
playersRef.on("value", function(snapshot) {

  // length of the 'players' array
  currentPlayers = snapshot.numChildren();

  // Check to see if players exist
  playerOneExists = snapshot.child("1").exists();
  playerTwoExists = snapshot.child("2").exists();

  // Player data objects
  playerOneData = snapshot.child("1").val();
  playerTwoData = snapshot.child("2").val();

  // If theres a player 1, fill in name and win loss data
  if (playerOneExists) {
		$("#player1-name").text(playerOneData.name);
		$("#player2-status").text("Waiting for Guest...");
																																		// $("#player1-wins").text("Wins: " + playerOneData.wins);
																																		// $("#player1-losses").text("Losses: " + playerOneData.losses);
  }
  else {

    // If there is no player 1, clear win/loss data and show waiting
    $("#player1-name").text("Waiting for Host...");
																																		// $("#player1-wins").empty();
																																		// $("#player1-losses").empty();
  }

  // If theres a player 2, fill in name and win/loss data
  if (playerTwoExists) {
		$("#player2-name").text(playerTwoData.name);
		$("#player1-status").text(playerOneData.status);
																																		// $("#player2-wins").text("Wins: " + playerTwoData.wins);
																																		// $("#player2-losses").text("Losses: " + playerTwoData.losses);
  }
  else {

    // If no player 2, clear win/loss and show waiting
    $("#player2-name").text("Waiting for Guest...");
																																		// $("#player2-wins").empty();
																																		// $("#player2-losses").empty();
  }
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Detects changes in current turn key
currentTurnRef.on("value", function(snapshot) {

  // Gets current turn from snapshot
  currentTurn = snapshot.val();

  // Don't do the following unless you're logged in
  if (playerNum) {

    // For turn 1
    if (currentTurn === 1) {

      // If its the current player's turn, tell them and show choices
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
        // $("#player" + playerNum + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>");
      }
      else {

        // If it isn't the current players turn, tells them they're waiting for player one
        $("#current-turn").html("<h4>Waiting for " + playerOneData.name + " to arrive.</h4>");
      }

      // Shows red border around active player
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

      // If its the current player's turn, tell them and show choices
      if (currentTurn === playerNum) {
				$("#current-turn").html("<h4>It's Your Turn! Click the button below to let you friends know you're on your way.</h4>");
				//Guest Button
					var b = $("<button>");
					b.addClass("onTheWay");
					b.attr("id", "onWay");
					b.text("On the Way");
					$("#player2-buttons").append(b)
        // $("#player" + playerNum + " ul").append("<li>Rock</li><li>Paper</li><li>Scissors</li>");
      }
      else {

        // If it isn't the current players turn, tells them they're waiting for player two
        $("#current-turn").html("<h4>Waiting for " + playerTwoData.name + " to be on the way.</h4>");

      }

			// Shows yellow border around active player
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

															//This is where the DIRECTIONS would disply in the middle!!!!!! After each user clicks their buttons.


																																	// // Where the game win logic takes place then resets to turn 1
																																	// gameLogic(playerOneData.choice, playerTwoData.choice);

      // reveal both player statuses
      $("#player1-chosen").text(playerOneData.choice);
			$("#player2-chosen").text(playerTwoData.choice);
		}

																																	//   //  reset after timeout
																																	//   var moveOn = function() {

																																	//     $("#player1-chosen").empty();
																																	//     $("#player2-chosen").empty();
																																	//     $("#result").empty();

																																	//     // check to make sure players didn't leave before timeout
																																	//     if (playerOneExists && playerTwoExists) {
																																	//       currentTurnRef.set(1);
																																	//     }
																																	//   };

																																	//   //  show results for 2 seconds, then resets
																																	//   setTimeout(moveOn, 2000);
																																	// }

    else {

      //  if (playerNum) {
      //    $("#player" + playerNum + " ul").empty();
      //  }
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
    // set turn to 1, which starts the game
    currentTurnRef.set(1);
  }
});

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------









// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Function to get in the game
function getInGame() {

  // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
  // Needed because Firebase's '.push()' creates its unique keys client side,
  // so you can't ".push()" in a ".onDisconnect"
  var chatDataDisc = database.ref("/chat/" + Date.now());

  // Checks for current players, if theres a player one connected, then the user becomes player 2.
  // If there is no player one, then the user becomes player 1
  if (currentPlayers < 2) {

    if (playerOneExists) {
      playerNum = 2;
    }
    else {
      playerNum = 1;
    }

    // Creates key based on assigned player number
    playerRef = database.ref("/players/" + playerNum);
		var newEmail = $("#email").val().trim();
    // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
    playerRef.update({
      name: username,
			email: newEmail,
      choice: null
		});

    // On disconnect remove this user's player object
    playerRef.onDisconnect().remove();

    // If a user disconnects, set the current turn to 'null' so the game does not continue
    currentTurnRef.onDisconnect().remove();

    // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
    chatDataDisc.onDisconnect().set({
      name: username,
      time: firebase.database.ServerValue.TIMESTAMP,
      message: "has left.",
      idNum: 0
		});

    // Remove name input box and show current player number.
		// $("#swap-zone").html("<h4>Hello " + username + "! You are now User " + playerNum + "</h4>");
		$("#swap-zone").html("<h4>Hello " + username + "! Welcome to the <strong>ihaveArrived</strong> Dashboard.</h4>");
  }
																															// else {

																															//   // If current players is "2", will not allow the player to join
																															//   alert("Sorry, there are already 2 users! Try Again Later!");
																															// }
};

// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------







// -----------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------

// Game logic - Tried to space this out and make it more readable. Displays who won, lost, or tie game in result div.
// Increments wins or losses accordingly.
function gameLogic(player1choice, player2choice) {

  var playerOneWon = function() {
    $("#result").html("<h4>" + playerOneData.name + "</h4><h4> has arrived!</h4>");
																													// if (playerNum === 1) {
																													//   playersRef.child("1").child("wins").set(playerOneData.wins + 1);
																													//   playersRef.child("2").child("losses").set(playerTwoData.losses + 1);
																													// }
  };

  var playerTwoWon = function() {
    $("#result").html("<h4>" + playerTwoData.name + "</h4><h4> is on the way!</h4>");
																													// if (playerNum === 2) {
																													//   playersRef.child("2").child("wins").set(playerTwoData.wins + 1);
																													//   playersRef.child("1").child("losses").set(playerOneData.losses + 1);
																													// }
  };

  var ARRIVED = function() {
		$("#result").html("<h4>Congratulations! You met up!</h4>");
		showButtons();
  };

  if (player1choice === "I have arrived" && player2choice === "On the Way") {
    ARRIVED();
  }
																												// else if (player1choice === "Paper" && player2choice === "Paper") {
																												//   tie();
																												// }
																												// else if (player1choice === "Scissors" && player2choice === "Scissors") {
																												//   tie();
																												// }
																												// else if (player1choice === "Rock" && player2choice === "Paper") {
																												//   playerTwoWon();
																												// }
																												// else if (player1choice === "Rock" && player2choice === "Scissors") {
																												//   playerOneWon();
																												// }
																												// else if (player1choice === "Paper" && player2choice === "Rock") {
																												//   playerOneWon();
																												// }
																												// else if (player1choice === "Paper" && player2choice === "Scissors") {
																												//   playerTwoWon();
																												// }
																												// else if (player1choice === "Scissors" && player2choice === "Rock") {
																												//   playerTwoWon();
																												// }
																												// else if (player1choice === "Scissors" && player2choice === "Paper") {
																												//   playerOneWon();
																												// }
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