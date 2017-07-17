function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById('map'),
  {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  })

  // Create the search box and link it to the UI element.
  const input = document.getElementById('pac-input')
   const searchBox = new google.maps.places.SearchBox(input)

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds())
  })

  let markers = []
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    const places = searchBox.getPlaces()

    if (places.length == 0) {
      return
    }

    markers.forEach(function(marker) {
      marker.setMap(null)
    })
    markers = []

    const bounds = new google.maps.LatLngBounds()
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry")
        return
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }

      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }))

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    })
    map.fitBounds(bounds)
  })

  searchBox.addListener('places_changed', () => {
    const fetchItem = searchParser($searchItem)
    $twitterContainer.innerHTML = ''

    fetch('/tweets/' + fetchItem)
      .then(response => {
        return response.json()
      })
      .then(data => {
        $twitterContainer.appendChild(renderTwitterElements(data.statuses))
      })
      .then(() => {
        const newChart = createChart(positive, negative, neutral)
        const $chart = document.querySelector('#chart')
        $chart.innerHTML = ''

        const sentimentChart = new Chart($chart, newChart)
      })

  })
}
