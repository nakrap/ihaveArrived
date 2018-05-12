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

      // VARIABLES
      // --------------------------------------------------------------------------------
      var database = firebase.database();
  
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // console.log("lat is " + pos.lat);
            // console.log("log is " + pos.lng);

            sendDataToFirebase(pos);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      
      //Sending data to Firebase
      function sendDataToFirebase(pos){
        var detectedPosLat = pos.lat;
        var detectedPosLang = pos.lng;
        database.ref().update({
                bdLat: detectedPosLat,
                bdLang: detectedPosLang,
                bdLatR: 0,
                bdLangR: 0,
                arrStat: "arrived",
              });
      }