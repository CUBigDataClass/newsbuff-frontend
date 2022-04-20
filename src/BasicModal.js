import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import { FacebookIcon, TwitterIcon, EmailIcon, WhatsappIcon } from 'react-share';
import Stack from '@mui/material/Stack';
import { useState } from 'react';




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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  //URL Copy to clipboard logic
  const [text, setText] = useState('');
  const inputHandler = event => {setText(event.target.value);}
  const copyLink = async () => {
      await navigator.clipboard.writeText(text);
      alert('URL Copied to Clipboard');
    }

  return (
    <div>
      {/* <Chip icon={<ShareIcon />} variant="outlined" /> */}
      {/* <IconButton color="primary" sx={{border: 1}} onClick={handleOpen} size="small" aria-label="share">
          <ShareIcon sx={{ fontSize: 12 }} />
      </IconButton> */}
      <Button color="secondary" sx={{ fontSize: 11 }} size="small" variant="outlined" onClick={handleOpen} startIcon={<ShareIcon />}>
        Share
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Share
          </Typography>
          <Typography id="modal-modal-description" component="h6" sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" gap={25}>
              <Typography>Image</Typography>   
              <Typography>Staten Island (NYC)</Typography>  
             </Stack>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Stack direction="row" alignItems="center" gap={10}>
              <Typography> <input type="text" value={text} onChange={inputHandler}/></Typography>   
              <Typography><button onClick={copyLink} style={{color: 'blue', outline: 'none', border: 'none', backgroundColor:'white',cursor:'pointer'}}>COPY LINK</button></Typography>  
             </Stack>
          </Typography><br/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Stack direction="row" alignItems="center" gap={1.0}>
               <button onClick={copyLink} style={{outline: 'none', border: 'none', backgroundColor:'white',cursor:'pointer'}}><TwitterIcon size={32} round={true}  /> </button> 
               <button onClick={copyLink} style={{outline: 'none', border: 'none', backgroundColor:'white',cursor:'pointer'}}><FacebookIcon size={32} round={true} /> </button> 
               <button onClick={copyLink} style={{outline: 'none', border: 'none', backgroundColor:'white',cursor:'pointer'}}><EmailIcon size={32} round={true}/> </button> 
               <button onClick={copyLink} style={{outline: 'none', border: 'none', backgroundColor:'white',cursor:'pointer'}}><WhatsappIcon size={32} round={true}  /> </button> 
              </Stack>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
