
function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.8534, lng: 2.3488},
        zoom: 11
      });

      var input = document.getElementById('pac-input');

      var autocomplete = new google.maps.places.Autocomplete(
          input, {placeIdOnly: true});
      autocomplete.bindTo('bounds', map);

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var infowindow = new google.maps.InfoWindow();
      var geocoder = new google.maps.Geocoder;
      var marker = new google.maps.Marker({
        map: map
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();

        if (!place.place_id) {
          return;
        }
        geocoder.geocode({'placeId': place.place_id}, function(results, status) {

          if (status !== 'OK') {
            window.alert('Geocoder failed due to: ' + status);
            return;
          }
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);

          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: results[0].geometry.location
          });
          marker.setVisible(true);
          document.getElementById('place-name').textContent = place.name;
          document.getElementById('place-id').textContent = place.place_id;
          document.getElementById('place-address').textContent =
              results[0].formatted_address;
          infowindow.setContent(document.getElementById('infowindow-content'));
          infowindow.open(map, marker);
        });
      });
    }
