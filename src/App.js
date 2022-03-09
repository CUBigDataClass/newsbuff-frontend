import './App.css';
import React, { useState, useEffect } from 'react'
import L from 'leaflet';
import { Slider } from '@material-ui/core';



function App() {


  useEffect(() => {
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([51.5, -0.09]).addTo(map)
      .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();   
    
  });

  return (
    <div className='App'>
    

      <div id="map" style={{ width: "100vw", height: "1000px" }}></div>

      
      
    </div>

  )
}

export default App



