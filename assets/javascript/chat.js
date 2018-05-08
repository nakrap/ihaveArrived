	// // Chat object
	// var chat = {
	// 	message:'',
	// 	listeners: function() {
	// 		// Send button click
	// 		$('#addMessage').on('click',function(event) {
	// 			chat.getMessage();
	// 			return false;
	// 		});
	// 		// Show message when received
	// 		chatRef.on('child_added', function(childSnapshot) {
	// 			// Get name and message
	// 			var playerName = childSnapshot.val().name;
	// 			var message = childSnapshot.val().message;
	// 			// Show message
	// 			chat.showMessage(playerName, message);
	// 		});
	// 	},
	// 	getMessage: function() {
	// 		var input = $('#message-input');
	// 		// Get message then clear it
	// 		chat.message = input.val();
	// 		input.val('');
	// 		// Send data to database if player has name
	// 		if (player !== undefined) {
	// 			chat.sendMessage();
	// 		}
	// 	},
	// 	sendMessage: function() {
	// 		var obj = {};
	// 		obj['name'] = name[player];
	// 		obj['message'] = chat.message;
	// 		chatRef.push(obj);
	// 	},
	// 	sendDisconnect: function(key) {
	// 		var obj = {};
	// 		obj['name'] = name[key];
	// 		obj['message'] = ' has disconnected.';
	// 		chatRef.push(obj);
	// 	},
	// 	showMessage: function(playerName, message) {
	// 		// Auto scroll to bottom variables
	// 		var messages = document.getElementById('messages');
	// 		var isScrolledToBottom = messages.scrollHeight - messages.clientHeight <= messages.scrollTop + 1;
	// 		// Create p with display string
	// 		var $p = $('<p>');
	// 		if (message == ' has disconnected.' && player !== undefined) {
	// 			$p.text(playerName + message);
	// 			$p.css('background','gray');
	// 		} else if (player !== undefined) {
	// 			$p.text(playerName + ': ' + message);
	// 		}
	// 		// If player 1 -> blue text
	// 		if (name[1] == playerName) {
	// 			$p.css('color','blue');
	// 		// If player 2 -> red text
	// 		} else if (name[2] == playerName) {
	// 			$p.css('color','red');
	// 		}
	// 		// Append message
	// 		if ($p.text() !== '') {
	// 			$('#messages').append($p);
	// 		}
	// 		// Auto scroll to bottom
	// 		if (isScrolledToBottom) {
	// 			messages.scrollTop = messages.scrollHeight - messages.clientHeight;;
	// 		}
	// 	}
	// }

	// // Start chat
	// chat.listeners();
