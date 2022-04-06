import './Article.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import moment from 'moment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default class ArticleHover extends React.Component {
    getCardText(headline, description) {
        return description.length < headline.length ? headline : description;
    }
    getSection(section) {
        return    (section!=='null' ? section : '');
    }
    getSubSection(subsection) {
        return    (subsection!=='null' ? subsection : '');
    }

    render() {
        return (
            <Card sx={{ m: 2 }}>
                    <Typography align = 'center' variant="body2" color="text.secondary">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                             <div><button onClick={() => { console.log('prev clicked'); }}><ArrowBackIosIcon/></button></div>
                             <div><button onClick={() => { console.log('next clicked'); }}><ArrowForwardIosIcon/></button></div>
                        </div>
                    </Typography>
                <CardActionArea href={this.props.article.webURL} target="_blank">
               
                    <Typography variant="body2" color="text.secondary">
                            {this.getSection(this.props.article.section)}  <br/>
                            {this.getSubSection(this.props.article.subsection)}
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
