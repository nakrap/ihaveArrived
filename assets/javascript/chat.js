//chat

$("#addMessage").on("click", function(event) {
	event.preventDefault();
	
	var myFirebase = new Firebase('https://www.gstatic.com/firebasejs/4.12.0/firebase.js')
	var messageUser = nameInput.value;
    var newMessage = $("#message-input").val().trim();
	myFirebase.set(msgUser + " says: " + msgText);
	textInput.value = ""

    chatBox.push(messageBox);

    $("#message-input").val("");

  });


  chatBox.on('child_added', function (childSnapshot) {
	console.log(childSnapshot);
	
    var msgUser = nameInput.value; 
    var chatMsg = childSnapshot.child("message").val();
    var chatEntry = $("<div>").text(chatMsg);
    
    $("#messages").append(chatEntry);
    $("#messages").scrollTop($("#messages")[0].scrollHeight);
    
    });