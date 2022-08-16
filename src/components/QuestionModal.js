import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'

const QuestionModal = (props) => {

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

  const [responseValue, setResponseValue] = useState(props.onAccept ? false : props.onRespondNumerical ? 0 : props.onRespondText ? '' : false);
  
  
  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        {props.onAccept ? 
          <>
            <Button
              variant='contained'
              color='success'
              sx={{
                marginTop: '1vh',
              }}
              onClick={() => props.onAccept()}
            >
              YES
            </Button>
            <Button 
              variant='contained'
              color='error'
              sx={{
                marginTop: '1vh',
                marginLeft: '1vw',
              }}
              onClick={() => props.onClose()}
            >
              NO
            </Button>
          </>
        : props.onRespondNumerical ?
        <>
          <TextField
            type='number'
            value={responseValue}
            onChange={(e) => setResponseValue(e.target.value)}
          />
          <Button onClick={() => props.onRespondNumerical(responseValue)}>Submit</Button>
          <Button onClick={() => props.onClose()}>Close</Button>
        </>
        : props.onRespondText ?
          <>
            <TextField
              type='text'
              value={responseValue}
              onChange={(e) => setResponseValue(e.target.value)}
            />
            <Button onClick={() => props.onRespondText(responseValue)}>Submit</Button>
            <Button onClick={() => props.onClose()}>Close</Button>
          </>
        : props.onRespondOptions ?
          <>
            {props.options.map(option => (
              <Button onClick={() => props.onRespondOptions(option)}>{option}</Button>
            ))}
            <Button onClick={() => props.onClose()}>Close</Button>
          </>
        : null} 
      </Box>
    </Modal>
  )
}

export default QuestionModal;