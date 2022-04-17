import React from "react";
import { Popup } from 'react-leaflet';
import Article from "./Article.js";

export default class PopupArticle extends React.Component {
    render() {
        const location = this.props.location;
        return (
            <Popup position={{ lat: location.latitude, lng: location.longitude }}>
            {/* {this.state.filteredArticles.map(article => ( */}
              <Article article={location.articles[0]} />
            {/* ))} */}
              </Popup>
        )
    }
}
