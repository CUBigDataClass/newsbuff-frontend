import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import TextField from '@mui/material/TextField';
import {
  EmailShareButton, WhatsappShareButton, TelegramShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton,
  EmailIcon, WhatsappIcon, TelegramIcon, FacebookIcon, TwitterIcon, LinkedinIcon,
} from "react-share";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default class BasicModal extends React.Component {

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
    const copyLink = async () => {
      await navigator.clipboard.writeText(this.props.article.webURL);
    };
    const article = this.props.article;

    return (
      <div>
        <Modal
          open={this.props.modalOpen}
          onClose={this.props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Share news article
            </Typography>
            <Typography id="modal-modal-description" component="h6" sx={{ mt: 2 }}>

              <Stack gap={2}>

                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 0.5 }} gap={2}>
                  <Box style={{ width: '100%' }}>
                    <Stack sx={{ mb: 0.5 }}>
                      <Link target="_blank" href={article.webURL} underline="none">
                        <Typography sx={{ mb: 0, fontSize: 16 }} variant="body2" color="primary" gutterBottom>
                          {article.headline}
                        </Typography>
                      </Link>
                    </Stack>
                    <Stack sx={{ mb: 0.5 }} direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <LocationOnIcon sx={{ fontSize: 16 }} />
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                          {article.locations[0].location}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTimeFilledIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                          {this.getTime(article.dateTime)}
                        </Typography>
                      </Stack>
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

                <Stack direction="row" alignItems="center" justifyContent='space-between' gap={2}>
                  <TextField sx={{ width: '16rem' }} id="standard-basic" variant="standard" readOnly={true} value={article.webURL} />
                  <Button onClick={copyLink} variant="outlined">Copy Link</Button>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent='space-between' gap={1.0}>
                  <EmailShareButton url={article.webURL}>
                    <EmailIcon size={48} round={true} />
                  </EmailShareButton>
                  <WhatsappShareButton url={article.webURL}>
                    <WhatsappIcon size={48} round={true} />
                  </WhatsappShareButton>
                  <TelegramShareButton url={article.webURL}>
                    <TelegramIcon size={48} round={true} />
                  </TelegramShareButton>
                  <FacebookShareButton url={article.webURL}>
                    <FacebookIcon size={48} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={article.webURL}>
                    <TwitterIcon size={48} round={true} />
                  </TwitterShareButton>
                  <LinkedinShareButton url={article.webURL}>
                    <LinkedinIcon size={48} round={true} />
                  </LinkedinShareButton>
                </Stack>

              </Stack>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
