{/* <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script> */}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPH6H536ccjgr9M48YunIT1tkMaYDJaUo",
    authDomain: "ihavearrived-e9123.firebaseapp.com",
    databaseURL: "https://ihavearrived-e9123.firebaseio.com",
    projectId: "ihavearrived-e9123",
    storageBucket: "ihavearrived-e9123.appspot.com",
    messagingSenderId: "393004989891"
  };
  firebase.initializeApp(config);

    var playerCounter = 0;

  var currentPlayer;

  // var playerOne = null;
  // var playerTwo = null;


  var database = firebase.database();
  var playersRef = database.ref('players');

  playersRef.on('child_added', function(childSnapshot) {
    console.log(childSnapshot);
    playerCounter++;
    
    if (playerCounter === 1) {
      playerOne = childSnapshot.val();
      currentPlayer = playerOne;
      addPlayerPanel(playerOne, 1);
    }
    else if (playerCounter === 2) {
      playerTwo = childSnapshot.val();
      
      if (currentPlayer !== undefined) {
        currentPlayer = playerTwo;
      }
      addPlayerPanel(playerTwo, 2);
      playGame();
      $('#user-create').hide();
    }
  });

  function playGame() {

  }



  function addPlayerPanel(player, num) {
    var playerPanel = $('<p>');
    playerPanel.text("Player " + num + ": " + player.name);
    $('#player-zone').append(playerPanel);
  }

  playersRef.onDisconnect();

    // Button for choosing player 1 and player 2;
    $("#make-player").on("click", function(event) {
      event.preventDefault();

    // Grabs user input
    var newPlayer = $(".form-control").val().trim();
    // Creates local "temporary" object for holding employee data
    var player = {
      name: newPlayer,
      enteredAt: firebase.database.ServerValue.TIMESTAMP
    };

    var a = $("<button>");
          // Adding a class to our button
          a.addClass("arrivedButton");
          // Adding a data-attribute
          a.attr("data-name", );
          // Providing the initial button text
          a.text("I have arrived");
          // Adding the button to the buttons-view div
          $("#player-zone").append(a);

    var b = $("<button>");

        b.addClass("onTheWay");

        b.attr("data-name", );

        b.text("On the Way");

        $("#player-zone").append(b)
    
    
          

    // Uploads player data to the database
    playersRef.push(player);

    // Clears all of the text-boxes
    $(".form-control").val("");

    });

    //Creating funtionality for newly created buttons to hide the main div in order to display the coordinates  
    $(".arrivedButton").on('click', function() {
      $("#player-zone").hide();
  });

  

    $('#reset').on('click', function() {
      playersRef.remove();
      $('#player-zone').empty();
      $('#user-create').show();
    });

        // Onchild removed function to remove all firebase data for both player 1 and 2

        // after js file is cleared with reset file create new function with database.empty
