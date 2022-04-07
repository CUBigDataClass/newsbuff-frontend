import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import Article from "./Article.js";
import ArticleHover from "./ArticleHover";
import YearSlider from "./YearSlider.js";
import Multiselect from "multiselect-react-dropdown";


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
      articles: [],
      category: ["category1", "category2", "category3"],
      search: ""
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

  onChange = e => {
    this.setState({search:e.target.value})
  }

  render() {
    const { search } = this.state;
    if (search === ""){
      console.log('no search')
    }
    //Write logic to intially log the article description if it contains the search term, then display articles whose description contains the search term
    // else if(Description.includes(search.toLowerCase)){
    //   console.log(Description)
    // }
    else{
      console.log(search)
    }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={3}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><h2>🌎 News Buff</h2></div>
            {/* search and filter articles */}
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}><input style={{width:'320px'}} type='text' placeholder="🔍 Search Articles... " onChange={this.onChange}/></div><br/>
            <div style={{ overflowY: 'scroll', height: '100vh' }}>
              {this.state.articles.map(article => (
                <Article article={article} />
              ))}
            </div>
          </Grid>
          <Grid item xs={9}>
            <div style={{ position: 'relative' }}>
              <MapContainer center={[20, 0]} zoom={3} scrollWheelZoom={true}>
              {/* Category dropdown checkboxes */}
              <Multiselect placeholder = "Select Category" isObject={false}onRemove={(event) => {console.log(event);}} onSelect={(event) => {console.log(event); }} options={this.state.category} selectedValues={["category1"]} showCheckbox />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.state.articles.map(article => (
                  <Marker key={article.webURL} position={[article.lng, article.lat]}>
                    <Popup position={[article.lng, article.lat]}>
                      <div>
                      <ArticleHover article={article}/>
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
