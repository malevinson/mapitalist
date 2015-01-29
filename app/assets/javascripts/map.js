var map;

function initialize() {
  // Create a simple map.
  console.log("initialize map");
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2,
    center: {lat: 0, lng: 0},
    disableDefaultUI: true
  });

  // Load country boundaries from GeoJSON
  map.data.loadGeoJson('/maps/countries.json');

  map.data.setStyle(function(feature) {
    return ({
      fillColor: feature.getProperty("color"),
      fillOpacity: 0.8,
      visible: feature.getProperty("visible"),
      strokeColor: "black",
      strokeWeight: 1
    });
  });

  // Global infowindow
  var infowindow = new google.maps.InfoWindow();

  // When the user clicks
  map.data.addListener('click', function(event) {
    // var properties = event.feature.k;
    // console.log(properties);
    var name = event.feature.getProperty("name");
    window.activeCountry = name;
    $('.tab').removeClass('selected');
    $('#tabs .country').addClass('selected');
    changeSelectedTab($('#tabs .selected'));

    $("#sidebar-left").animate({"margin-left": '0'});
  });  

  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {fillOpacity: 0.5});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });
}

setTimeout(updateMapData, 1500);
var updateMapDataIntervalId = window.setInterval(updateMapData, 10000);

function updateMapData(){
  console.log("update map data");
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/maps/countries.json',
    success: function(json){
      
    // iterate over ever feature (country)
    map.data.forEach(function(feature) {
      var countryName = feature.getProperty("name");
      var jsonObj = _.find(json.features, function(feature){
        return feature.properties.name == countryName;
      });

      feature.forEachProperty(function(v,k){
        // set each map property to equal the json value
        feature.setProperty(k, jsonObj.properties[k]);
      });
    });

    // changeSelectedTab($('#tabs .selected'));

    console.log("Updated map to match server data");

    },
    failure: function(){
      console.log("error fetching " + this.url);
    }
  });
}