import './App.css';
import React, {useEffect } from 'react'
import L from 'leaflet';
import $ from 'jquery';
import noUiSlider from 'nouislider';

function App() {


  useEffect(() => {
    var map = L.map('map').setView([52.06, 7.40], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //loading local geojson file
    $.getJSON('map.geojson', function(data) {
      L.geoJSON(data).addTo(map);
    });

  //Slider
  var slider = document.getElementById('slider-round');

  noUiSlider.create(slider, {
    start: 1,
    tooltips: true,
    range: {
        'min': 0,
        'max': 100
    },
  });

    // //adding geojson data using a variable
    // var geojson = { "type": "FeatureCollection","features": [{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [28.30078125,5.61598581915534]}},{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [36.38671875,-6.839169626342808]}},{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [-1.58203125,7.710991655433229]}},{"type": "Feature","properties": {},"geometry": {"type": "Point","coordinates": [-361.2744140625,51.34433866059924]}},{"type": "Feature","properties": {},"geometry": {"type": "Polygon","coordinates": [[[-362.548828125,52.45600939264076],[-359.6484375,52.45600939264076],[-359.6484375,53.64463782485651],[-362.548828125,53.64463782485651],[-362.548828125,52.45600939264076]]]}}]}
    // L.geoJSON(geojson).addTo(map);
    
    // //adding geojson data by fetching an api
    // fetch('https://data.cityofnewyork.us/resource/erm2-nwe9.geojson?descriptor=Social%20Distancing')
    //   .then(function (response){
    //     return response.json();
    //   })
    //   .then(function (data){
    //     L.geoJSON(data,{
    //       style:function(feature){
    //         return {color:'red'};
    //       }
    //     }).addTo(map); 
    //   });

});

 
  return (
    <div className='App'>
      <div class="slider-styled" id="slider-round"></div>
      <br/>
      <div id="map"></div>
    </div>

  )
}

export default App



