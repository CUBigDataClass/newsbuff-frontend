import React from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Article from "./Article.js";

export default class PopupArticle extends React.Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      count: 0,
      current: 0,
      prevAvailable: false,
      nextAvailable: false,
    };
    this.clickPrev = this.clickPrev.bind(this);
    this.clickNext = this.clickNext.bind(this);
  }

  updatePrevNext(current, count) {
    const prevAvailable = current > 0;
    const nextAvailable = current < count-1;
    if (this._isMounted) {
      this.setState({ current, count, prevAvailable, nextAvailable });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const count = this.props.location.articles.length;
    this.updatePrevNext(0, count);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clickPrev() {
    let { current, count } = this.state;
    current = this.state.current - 1;
    this.updatePrevNext(current, count);
  }

  clickNext() {
    let { current, count } = this.state;
    current = this.state.current + 1;
    this.updatePrevNext(current, count);
  }

  render() {
    const location = this.props.location;
    return (
      <Box>
        <Stack sx={{ px: 3, py: 0.5 }} direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Button disabled={!this.state.prevAvailable} size="small" variant="outlined" onClick={this.clickPrev} startIcon={<ArrowBackIcon />}>
            Prev
          </Button>
          <Button disabled={!this.state.nextAvailable} size="small" variant="outlined" onClick={this.clickNext} endIcon={<ArrowForwardIcon />}>
            Next
          </Button>
        </Stack>
        <Article article={location.articles[this.state.current]} />
      </Box>
    )
  }
}
