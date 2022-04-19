import { Component } from "react";
import { MapContainer, TileLayer, ZoomControl, ScaleControl, Marker, Popup, FeatureGroup} from 'react-leaflet';
import "leaflet-area-select";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './App.css';
import Article from "./Article.js";
import PopupArticle from "./PopupArticle";
import L from 'leaflet';
import Search from './Search'
import NewSlider from "./NewSlider.js";
import {EditControl} from 'react-leaflet-draw';
import "leaflet-draw/dist/leaflet.draw.css";
import Polygon from "./Polygon";




const API_BASE_URL = 'https://crypto-volt-345721.et.r.appspot.com/api'
const TODAY = new Date();
const CURRENT_YEAR = TODAY.getFullYear();
const CURRENT_MONTH = TODAY.getMonth() + 1;
const CURRENT_DAY = 1;
// const CURRENT_DAY = TODAY.getDate();

const cachedData = {};

const getData = (year, month, day) => {
  const key = `${year}-${month}-${day}`;
  if (cachedData.hasOwnProperty(key)) {
    return cachedData[key];
  }
  return fetch(`${API_BASE_URL}/${year}/${month}/${day}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  )
    .then(res => {
      const data = res.json();
      cachedData[key] = data;
      return data;
    });
};

class App extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      year: TODAY.getFullYear(),
      month: TODAY.getMonth() + 1,
      day: 1,
      query: '',
      articles: [],
      locations: [],
      sections: [],
      filteredArticles: [],
      filteredLocations: [],
    };
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  getLocations(articles) {
    const locationsObj = {};
    articles.forEach(article => {
      const articleLocations = article.locations;
      articleLocations.forEach(articleLocation => {
        const locationName = articleLocation.location;
        if (!locationsObj.hasOwnProperty(locationName)) {
          locationsObj[locationName] = JSON.parse(JSON.stringify(articleLocation));
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
    return locations;
  }

  updateArticles() {
    getData(this.state.year, this.state.month, this.state.day)
      .then(res => {
        const articles = res.rows;
        const locations = this.getLocations(articles);
        if (this._isMounted) {
          this.updateFilteredArticles(true, articles, locations, this.state.query);
        }
      });
  }

  getHighlightedText(text, query) {
    const queryLength = query.length;
    const indexes = [...text.matchAll(new RegExp(query, 'gi'))].map(a => a.index);
    const highlightedText = [];
    const indexesLength = indexes.length;
    let prevIndex = 0;
    let match = indexes.length > 0;
    for (let i=0; i<indexesLength; i++) {
      if (prevIndex !== indexes[i]) {
        const prevString = text.substring(prevIndex, indexes[i]);
        highlightedText.push(prevString);
      }
      const highlightedSubstr = `<span class="highlighted-text">${text.substr(indexes[i], queryLength)}</span>`;
      highlightedText.push(highlightedSubstr);
      prevIndex = indexes[i] + queryLength;
    }
    if (prevIndex !== text.length) {
      const prevString = text.substring(prevIndex, text.length);
      highlightedText.push(prevString);
    }
    const highlightedTextString = highlightedText.join('');
    return [match, highlightedTextString];
  }
  
  updateFilteredArticles(fetched, articles, locations, query) {
    if (!query) {
      if (fetched) {
        this.setState({ articles, locations, query, filteredArticles: articles, filteredLocations: locations });
      } else {
        this.setState({ query, filteredArticles: articles, filteredLocations: locations });
      }
    } else {
      const filteredArticles = [];
      const articlesLength = articles.length;
      for(let i = 0; i < articlesLength; i++) {
        const [headlineMatch, highlightedHeadline] = this.getHighlightedText(articles[i].headline, query);
        const [locationMatch, highlightedLocation] = this.getHighlightedText(articles[i].locations[0].location, query);
        const [sectionMatch] = this.getHighlightedText(articles[i].section, query);
        const [abstractMatch, highlightedAbstract] = this.getHighlightedText(articles[i].abstract, query);
        if (headlineMatch || locationMatch || sectionMatch || abstractMatch) {
          const filteredArticle = JSON.parse(JSON.stringify(articles[i]));
          if (headlineMatch) {
            filteredArticle.headline = highlightedHeadline;
          }
          if (locationMatch) {
            filteredArticle.locations[0].location = highlightedLocation;
          }
          if (sectionMatch) {
            filteredArticle.sectionHighlighted = true;
          }
          if (abstractMatch) {
            filteredArticle.abstract = highlightedAbstract;
          }
          filteredArticles.push(filteredArticle);
        }
      }
      const filteredLocations = this.getLocations(filteredArticles);
      if (fetched) {
        this.setState({ articles, locations, query, filteredArticles, filteredLocations });
      } else {
        this.setState({ query, filteredArticles, filteredLocations });
      }
    }
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

  handleQueryChange(newQuery) {
    if (this._isMounted) {
      this.updateFilteredArticles(false, this.state.articles, this.state.locations, newQuery);
    }
  }

  handleMouseEnter(locationsSet) {
    const { filteredLocations } = this.state;
    filteredLocations.forEach(location => {
      if (locationsSet.has(location.location)) {
        location.inFocus = true;
      }
    });
    if (this._isMounted) {
      this.setState({ filteredLocations });
    }
  }

  handleMouseLeave(locationsSet) {
    const { filteredLocations } = this.state;
    filteredLocations.forEach(location => {
      if (locationsSet.has(location.location)) {
        location.inFocus = false;
      }
    });
    if (this._isMounted) {
      this.setState({ filteredLocations });
    }
  }

  getMarkerIcon(sentimentScore, inFocus) {
    // const min = 150; // red
    // const max = 270; // green
    // const mid = (min + max) / 2; // 210
    // const range = (max - min) / 2; // 60
    const rotation = 210 + sentimentScore * 60;
    const inFocusClass = inFocus ? 'in-focus' : '';
    return L.divIcon({
      className: `custom-icon ${inFocusClass}`,
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
            <Box>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4" component="div" className='logo-text' sx={{ my: 2 }} style={{ fontWeight: 'bold' }}>
                  <span>🌎 </span>
                  <span className='logo-news'>News</span>
                  <span className='logo-buff'> Buff</span>
                </Typography >
              </div>
              <Search year={this.state.year}
                month={this.state.month}
                handleChange={this.handleQueryChange}
              />
              <Typography sx={{ mx: 2, mb: 1 }} variant="body2" color="secondary">
                Showing {this.state.filteredArticles.length} news articles
              </Typography >
              <Divider light />
            </Box>
            <div style={{ overflowY: 'scroll', height: 'calc(100vh - 9.5rem)' }}>
              {this.state.filteredArticles.map(article => (
                <Article key={article.uri} article={article}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div style={{ position: 'relative' }}>
              <MapContainer center={[0, 0]} zoom={2} zoomControl={false} scrollWheelZoom={true}>
                <Polygon/>
                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
                />
                <ScaleControl position="topright" />
                <ZoomControl position="bottomright" />
    
          
                {this.state.filteredLocations.map(location => (
                  <Marker
                    icon={this.getMarkerIcon(location.sentimentScore, location.inFocus)}
                    zIndexOffset={location.inFocus ? 1000 : 0}
                    key={location.location}
                    position={{ lat: location.latitude, lng: location.longitude }}
                  >
                    <Popup position={{ lat: location.latitude, lng: location.longitude }}>
                      <PopupArticle location={location} 
                      handleMouseEnter={this.handleMouseEnter}
                      handleMouseLeave={this.handleMouseLeave}
                      />
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <NewSlider
                className="slider year-slider"
                minValue={1900}
                maxValue={2022}
                defaultValue={CURRENT_YEAR}
                currentValue={this.state.year}
                handleChange={this.handleYearChange}
              />
              <NewSlider
                className="slider month-slider"
                minValue={1}
                maxValue={12}
                defaultValue={CURRENT_MONTH}
                currentValue={this.state.month}
                handleChange={this.handleMonthChange}
              />
              <NewSlider
                className="slider day-slider"
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
