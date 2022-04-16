import { Component } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import L from 'leaflet';

import Article from "./Article.js";
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
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  updateArticles() {
    getData(this.state.year, this.state.month)
      .then(res => this.setState({ articles: res.rows }));
  }

  componentDidMount() {
    this.updateArticles();
  }

  handleYearChange(newYear) {
    this.setState({ year: newYear });
    this.updateArticles();
  }

  getMarkerIcon(sentimentScore) {
    if (!sentimentScore) sentimentScore = Math.random() * 2 - 1;
    // const min = 150; // red
    // const max = 270; // green
    // const mid = (min + max) / 2; // 210
    // const range = (max - min) / 2; // 60
    const rotation = 210 + sentimentScore * 60;
    return L.divIcon({
      className: 'custom-icon',
      html: `
      <img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png"/ style="filter: hue-rotate(${rotation}deg);">
      <img src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png" class='shadow'>
      `
    });
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <div style={{ overflowY: 'scroll', height: '100vh' }}>
              {this.state.articles.map(article => (
                <Article article={article} />
              ))}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div style={{ position: 'relative' }}>
              <MapContainer center={[20, 0]} zoom={3} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.articles.map(article => (
                  <Marker icon={this.getMarkerIcon(article.sentimentScore)} key={article.webURL} position={[article.lng, article.lat]} />
                ))}
              </MapContainer>
              <YearSlider
                year={this.state.year}
                month={this.state.month}
                handleYearChange={this.handleYearChange}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
