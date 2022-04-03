import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
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

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h2>🌎 News Buff</h2></div>
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
                  <Marker key={article.webURL} position={[article.lng, article.lat]}>
                    <Popup position={[article.lng, article.lat]}>
                      <div>
                      <Article article={article}/>
                      </div>
                    </Popup>
                  </Marker>
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
