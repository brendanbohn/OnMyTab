$(document).ready(function(){

  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
  } else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  };

  window.onload = function() {
    var startPos;
    navigator.geolocation.getCurrentPosition(function(position) {
      startPos = position;
      document.getElementById('startLat').innerHTML = startPos.coords.latitude;
      document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    });
  };

  window.onload();

  navigator.geolocation.watchPosition(function(position) {
    var lat = document.getElementById('currentLat').innerHTML = position.coords.latitude;
    var lon = document.getElementById('currentLon').innerHTML = position.coords.longitude;
    var userLocation = {lat, lon};
    console.log(userLocation);
  });

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 3959; // miles
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2 - lon1).toRad(); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c;
    return d;
  };

  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  };

  navigator.geolocation.watchPosition(function(position) {
    var startPos = position;
    document.getElementById('distance').innerHTML =
    calculateDistance(startPos.coords.latitude, startPos.coords.longitude, position.coords.latitude, position.coords.longitude);
})

});

