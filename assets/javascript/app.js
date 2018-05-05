<script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>

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

var user1 = user1
var user2 = user2

    var database = firebase.database();

    // Button for choosing player 1 and player 2;
    $(".btn-secondary").on("click", function(event) {
        event.preventDefault();
  
    // This line grabs the name input from the textbox
    var newPlayer = $(".form-control").val().trim();

    // Creates local "temporary" object for holding employee data
    var playerOne = {
        name: newPlayer,
    };

    var a = $("<button>");
          // Adding a class to our button
          a.addClass("newButton");
          // Adding a data-attribute
          a.attr("data-name", );
          // Providing the initial button text
          a.text("I have arrived");
          // Adding the button to the buttons-view div
          $("#status-view").append(a);

    var b = $("<button>");

        b.addClass("newButton");

        b.attr("data-name", );

        b.text("On the Way");

        $("#status-view").append(b)
    
    
          console.log(playerOne.name);

    // Uploads employee data to the database
    database.ref().push(playerOne);


    
    // Alert
    alert(playerOne.name + " is up first!");
    });
    // Clears all of the text-boxes
    $(".form-control").val("");


    
    
    // Onchild removed function to remove all firebase data for both player 1 and 2