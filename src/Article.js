import React from "react";
import './Article.css';

export default class Article extends React.Component {
    render() {
        return (
            <p>{this.props.article.headline}</p>
        )
    }
}
