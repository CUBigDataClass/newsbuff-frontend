import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Popup } from 'react-leaflet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Article from "./Article.js";

export default class PopupArticle extends React.Component {
    render() {
        const location = this.props.location;
        return (
            <Popup position={{ lat: location.latitude, lng: location.longitude }}>
              <Stack sx={{px: 3, py: 0.5}} direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Button disabled={true} size="small" variant="outlined" startIcon={<ArrowBackIcon />}>
                  Prev
                </Button>
                <Button disabled={false} size="small" variant="outlined" endIcon={<ArrowForwardIcon />}>
                  Next
                </Button>
              </Stack>
            {/* {this.state.filteredArticles.map(article => ( */}
              <Article article={location.articles[0]} />
            {/* ))} */}
              </Popup>
        )
    }
}
