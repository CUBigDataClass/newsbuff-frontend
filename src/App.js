import { Component } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import L from 'leaflet';

import Article from "./Article.js";
import NewSlider from "./NewSlider.js";

const API_BASE_URL = 'https://crypto-volt-345721.et.r.appspot.com/api'
const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth() + 1;
const CURRENT_DAY = 1;
// const CURRENT_DAY = TODAY.getDate();


const getData = (year, month, day) => {
  return fetch(`${API_BASE_URL}/${year}/${month}/${day}`,
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
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      year: TODAY.getFullYear(),
      month: TODAY.getMonth() + 1,
      day: 1,
      // day: TODAY.getDate(),
      articles: [],
      locations: []
    };
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  updateArticles() {
    getData(this.state.year, this.state.month, this.state.day)
      .then(res => {
        const articles = res.rows;
        const locationsObj = {};
        articles.forEach(article => {
          const articleLocations = article.locations;
          articleLocations.forEach(articleLocation => {
            const locationName = articleLocation.location;
            if (!locationsObj.hasOwnProperty(locationName)) {
              locationsObj[locationName] = articleLocation;
              locationsObj[locationName].articles = [article];
            } else {
              locationsObj[locationName].articles.push(article);
            }
          });
        });
        const locations = Object.values(locationsObj);
        locations.forEach(location => {
          let count = 0, sum = 0;
          const locationArticles = location.articles;
          locationArticles.forEach(locationArticle => {
            count++;
            if (!locationArticle.hasOwnProperty('sentimentScore'))
              locationArticle.sentimentScore = Math.random() * 2 - 1;
            sum += locationArticle.sentimentScore;
          });
          location.sentimentScore = sum / count;
        });
        if (this._isMounted) {
          this.setState({ articles });
          this.setState({ locations });
        }
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateArticles();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleYearChange(newYear) {
    if (this._isMounted) {
      this.setState({ year: newYear });
      this.updateArticles();
    }
  }

  handleMonthChange(newMonth) {
    if (this._isMounted) {
      this.setState({ month: newMonth });
      this.updateArticles();
    }
  }

  handleDayChange(newDay) {
    if (this._isMounted) {
      this.setState({ day: newDay });
      this.updateArticles();
    }
  }

  getMarkerIcon(sentimentScore) {
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
                <Article key={article.uri} article={article} />
              ))}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div style={{ position: 'relative' }}>
              <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                />
                {this.state.locations.map(location => (
                  <Marker icon={this.getMarkerIcon(location.sentimentScore)} key={location.location} 
                    position={{ lat: location.latitude, lng: location.longitude }} />
                ))}
              </MapContainer>
              <NewSlider
                className="slider yearSlider"
                minValue={1900}
                maxValue={2022}
                defaultValue={CURRENT_YEAR}
                currentValue={this.state.year}
                handleChange={this.handleYearChange}
              />
              <NewSlider
                className="slider monthSlider"
                minValue={1}
                maxValue={12}
                defaultValue={CURRENT_MONTH}
                currentValue={this.state.month}
                handleChange={this.handleMonthChange}
              />
              <NewSlider
                className="slider daySlider"
                minValue={1}
                maxValue={31}
                defaultValue={CURRENT_DAY}
                currentValue={this.state.day}
                handleChange={this.handleDayChange}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
