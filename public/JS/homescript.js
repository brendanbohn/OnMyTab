$(document).ready(function(){

  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  } else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  };

  navigator.geolocation.watchPosition(function(position) {
    var lat = document.getElementById('currentLat').innerHTML = position.coords.latitude;
    var lon = document.getElementById('currentLon').innerHTML = position.coords.longitude;
  });

});

