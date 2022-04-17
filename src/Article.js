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
    getSubSection(subsection) {
        return    (subsection!=='null' ? subsection : '');
    }

    render() {
        return (
            <Card sx={{ m: 2 }}>
                <CardActionArea href={this.props.article.webURL} target="_blank">
                    <Typography variant="body2" color="text.secondary">
                        {this.getSection(this.props.article.section)}
                    </Typography>
                    {this.props.article.imageURL && 
                        <CardMedia
                            component="img"
                            height="160"
                            image={this.props.article.imageURL}
                        />
                    }
                    <CardContent>
                        <Typography variant="body2" gutterBottom>
                            {this.props.article.headline}
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {this.props.article.abstract}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"> {this.props.article.location + ', ' + moment(this.props.article.dateTime).format('MMMM Do [at] hh:mm a')}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
