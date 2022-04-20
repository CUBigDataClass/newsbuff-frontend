import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';


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
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  render() {
    const handleOpen = (e) => {
      e.preventDefault();
      this.setState({open: true});
    }
    const handleClose = () => {
      this.setState({open: false});
    };

    return (
      <div>
        <Button color="success" sx={{ fontSize: 11 }} size="small" variant="outlined" onClick={handleOpen} startIcon={<ShareIcon />}>
          Share
        </Button>
        <Modal
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Share
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {this.props.article.headline}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}
