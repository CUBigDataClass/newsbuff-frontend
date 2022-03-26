import { Component } from "react";

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import './App.css';
import YearSlider from "./YearSlider.js";

const getData = (year, month) => {
  return fetch(`sample-responses/${year}/${month}.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
    .then(res => res.json());
};

class App extends Component {
  constructor() {
    super();
    this.state = { 
      year: 2020,
      month: 1,
      articles: [] 
    };
  }

  componentDidMount() {
    getData(this.state.year, this.state.month)
    .then(res => this.setState({ articles: res.rows }))
    .then(()=> console.log([this.state.articles[0].lng, this.state.articles[0].lat]));
  }

  render() {
    if (this.state.articles && this.state.articles.length > 0) {
      console.log([]);
    }
    return (
      <div>
        <MapContainer center={[20, 0]} zoom={3} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.articles.map(article => (
            <Marker position={[article.lng, article.lat]} />
          ))}
        </MapContainer>
        <YearSlider />
      </div>
    );
  }
}

export default App;
