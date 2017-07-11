function initAutoComplete() {
  let searchElement = document.querySelector('#search-item')
  let autocomplete = new google.maps.places.Autocomplete(searchElement, {
    types: ['geocode']
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    getLatLng();
  });
}

initAutoComplete()
