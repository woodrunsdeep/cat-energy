function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 59.938826, lng: 30.323212}
  });

  var image = 'https://htmlacademy-adaptive.github.io/1183083-cat-energy-19/8/img/map-pin.png';
  var customMarker = new google.maps.Marker({
    position: {lat: 59.938826, lng: 30.323212},
    map: map,
    icon: image
  });
}
