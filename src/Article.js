import './Article.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import moment from 'moment';


export default class Article extends React.Component {
    getCardText(headline, description) {
        return description.length < headline.length ? headline : description;
    }
    getSection(section) {
        return    (section!=='null' ? section : '');
    }


    render() {
        return (
            <Card sx={{ m: 2 }}>
                <CardActionArea href={this.props.article.webURL} target="_blank">
                    <Typography variant="body2" color="text.secondary">
                            {this.getSection(this.props.article.section)}  
                    </Typography>
                    <CardMedia
                        component="img"
                        height="160"
                        image={this.props.article.imageURL}
                    />
                    <CardContent>
                        {/* <Typography gutterBottom variant="h5" component="div">
                            Headline
                        </Typography> */}
                        <Typography variant="body2" color="text.secondary">
                            {this.getCardText(this.props.article.headline, this.props.article.description)}
                        </Typography> <br/>
                        <Typography variant="body2" color="text.secondary"> {this.props.article.location + ', ' + moment(this.props.article.datetime).format('MMMM Do [at] h:mm:ss a')}</Typography><br/>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
