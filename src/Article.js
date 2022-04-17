import './Article.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default class Article extends React.Component {
    getCardText(headline, description) {
        return description.length < headline.length ? headline : description;
    }

    render() {
        return (
            <Card sx={{ m: 2 }}>
                <CardActionArea href={this.props.article.webURL} target="_blank">
                    <CardMedia
                        component="img"
                        height="160"
                        image={this.props.article.imageURL}
                    />
                    <CardContent>
                        <Typography variant="body2" gutterBottom>
                            {this.props.article.headline}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {this.props.article.abstract}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
