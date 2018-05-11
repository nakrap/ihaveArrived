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

database.ref().on("value", function (snapshot) {
    //console.log(snapshot.val());
    var latPos = snapshot.val().bdLat;
    //console.log(latPos);
    var lngPos = snapshot.val().bdLang;
    //console.log(lngPos);

    var latPosR = snapshot.val().bdLatR;
    console.log("DB data is " + latPosR);
    var lngPosR = snapshot.val().bdLangR;
    console.log("DB data is " + lngPosR);

    var sysStat = snapshot.val().arrStat;
    initMap(latPos, lngPos, latPosR, lngPosR);
    sysStatus(sysStat);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});


// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap(latPos, lngPos, latPosR, lngPosR) {
    var latData = latPos;
    console.log("Arr data " + latData);
    var lngData = lngPos;
    console.log("Arr data" + lngData);
    var latDataD = latPosR;
    console.log("Dest data " + latDataD);
    var lngDataD = lngPosR;
    console.log("Dest data " + lngDataD);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latData, lng: lngData },
        zoom: 15
    });

    //Direction Service
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay, latData, lngData);
    document.getElementById('mode').addEventListener('change', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay, latData, lngData);
    });

    //Route calculator
    function calculateAndDisplayRoute(directionsService, directionsDisplay, latData, lngData) {
        var latDataR = latData;
        console.log("Lat IS " + latData);
        var lngDataR = lngData;
        console.log("Lng IS " + lngData);
        var selectedMode = document.getElementById('mode').value;
        console.log(selectedMode);
        directionsService.route({
            origin: {lat: latDataR , lng: lngDataR},
            destination: {lat: latDataD, lng: lngDataD},
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

    //Test center data
    //console.log(map.center);

    var marker = new google.maps.Marker({
        position: map.center,
        map: map,
        zoom: 15,
        title: 'Nick is arrived'
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div id ="marker"><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, this);
            });
        }
    });
    
    infoWindow = new google.maps.InfoWindow;
    
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
  
              console.log("lat is " + pos.lat);
              console.log("log is " + pos.lng);
  
              infoWindow.setPosition(pos);
              sendDataToFirebase(pos);
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
function sendDataToFirebase(pos) {
    console.log('THis is fired for player 2')
    var detectedPosLatR = pos.lat;
    var detectedPosLangR = pos.lng;
    database.ref().update({
        bdLatR: detectedPosLatR,
        bdLangR: detectedPosLangR,
        arrStat: "arrived"
    });
}

//Sending status to Firebase
function sysStatus(sysStat) {
    var sStat = sysStat;
    //console.log(sStat);
    if (sStat != null) {
        $("#messageArea").html("Location has been detected!");
    } else {
        $("#messageArea").html("Please wait!");
    }
}