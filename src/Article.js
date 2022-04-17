import './Article.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { CardActionArea } from '@mui/material';

export default class Article extends React.Component {
    getTime(dateString) {
        const date = new Date(dateString);
        let hr = date.getHours();
        let min = date.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        let ampm = "AM";
        if (hr > 12) {
            hr -= 12;
            ampm = "PM";
        }
        if (hr < 10) {
            hr = "0" + hr;
        }
        return `${hr}:${min} ${ampm}`;
    }
    render() {
        const article = this.props.article;
        return (
            <Card sx={{ m: 2 }}>
                <CardActionArea href={article.webURL} target="_blank">
                    <CardContent>
                        <Grid container sx={{ mb: 0.5 }}>
                            <Grid item xs={8} pr={1}>
                                <Typography sx={{ mb: 0.5 }} variant="body2" gutterBottom>
                                    {article.headline}
                                </Typography>
                                <Stack sx={{ mb: 0.5 }} direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
                                    <Stack direction="row" alignItems="center" gap={0.5}>
                                        <LocationOnIcon sx={{ fontSize: 14 }} />
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            {article.locations[0].location}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" gap={0.5}>
                                        <AccessTimeFilledIcon sx={{ fontSize: 12 }} />
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            {this.getTime(article.dateTime)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {article.section &&
                                    <Chip label={article.section} size="small" />
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {article.imageURL &&
                                    <img className='article-img'
                                        src={article.imageURL} alt="article"
                                    />
                                }
                            </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            {article.abstract}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}
