import './Article.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import BasicModal from "./BasicModal.js";

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modalOpen: false,
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleMouseEnter() {
        const handleMouseEnterFunction = this.props.handleMouseEnter;
        if (handleMouseEnterFunction) {
            const locationsSet = new Set(this.props.article.locations.map(e => e.location));
            handleMouseEnterFunction(locationsSet);
        }
    }

    handleMouseLeave() {
        const handleMouseLeaveFunction = this.props.handleMouseLeave;
        if (handleMouseLeaveFunction) {
            const locationsSet = new Set(this.props.article.locations.map(e => e.location));
            handleMouseLeaveFunction(locationsSet);
        }
    }

    handleOpen(e) {
      e.preventDefault();
      this.setState({modalOpen: true});
    }
    handleClose() {
      this.setState({modalOpen: false});
    };

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
        let sectionChip = null;
        if (article.section) {
            if (article.sectionHighlighted) {
                sectionChip = <Chip label={article.section} style={{ backgroundColor: '#ffd63f' }} size="small" />;
            } else {
                sectionChip = <Chip label={article.section} size="small" />;
            }
        }
        return (
            <Box>
                <BasicModal article={article} modalOpen={this.state.modalOpen} handleClose={this.handleClose} />
                <CardActionArea href={article.webURL} target="_blank"
                    onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
                >
                    <Stack sx={{ p: 1.5 }} style={{ borderRadius: 0, borderTop: 1 }}>
                        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 0.5 }} gap={1}>
                            <Box style={{ width: '100%' }}>
                                <Stack sx={{ mb: 0.5 }}>
                                    <Typography sx={{ mb: 0 }} variant="body2" color="primary" gutterBottom>
                                        <span dangerouslySetInnerHTML={{ __html: article.headline }} />
                                    </Typography>
                                </Stack>
                                <Stack sx={{ mb: 0.5 }} direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
                                    <Stack direction="row" alignItems="center" gap={0.5}>
                                        <LocationOnIcon sx={{ fontSize: 14 }} />
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            <span dangerouslySetInnerHTML={{ __html: article.locations[0].location }} />
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" gap={0.5}>
                                        <AccessTimeFilledIcon sx={{ fontSize: 12 }} />
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            {this.getTime(article.dateTime)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Stack sx={{ mb: 0.5 }} direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
                                    {sectionChip}
                                    <Button color="success" sx={{ fontSize: 11 }} size="small" variant="outlined" onClick={this.handleOpen} startIcon={<ShareIcon />}>
                                    Share
                                    </Button>
                                </Stack>
                            </Box>
                            <Box>
                                {article.imageURL &&
                                    <img className='article-img'
                                        src={article.imageURL} alt="article"
                                    />
                                }
                            </Box>
                        </Stack>
                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                            <span dangerouslySetInnerHTML={{ __html: article.abstract }} />
                        </Typography>
                    </Stack>
                    <Divider light />
                </CardActionArea>
            </Box>

        )
    }
}
