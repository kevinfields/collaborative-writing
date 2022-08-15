import { Grid, Typography } from '@mui/material'
import React from 'react'

const ProjectDisplayMap = (props) => {
  return (
    <div>
      <Grid
        container
        sx={{
          width: '50vw',
          height: '25vh',
          overflowY: 'scroll',
          margin: '1vw',
          border: "1px solid red",
        }}
        columns={16}
        columnSpacing={0}
      >
        <Grid 
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '45vw',
            height: '4vh',
            marginLeft: '2.5vw',
          }}
        >
          <Typography
            sx={{
              width: '5vw',
              border: '1px solid darkblue',
            }}
          >
            Bass: 
          </Typography>
          {props.bass.map(item => (
            <div 
              style={{
                width: `${Number(item.barCount)}vw`,
                height: '4vh',
                fontSize: '8px',
                wordWrap: 'break-word',
                backgroundColor: 'lightblue',
                border: '1px solid blue',
              }}
            >
              {item.trackLink}
            </div>
          ))}
        </Grid>
        <Grid 
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '45vw',
            height: '4vh',
            marginLeft: '2.5vw',
          }}
        >
          <Typography
            sx={{
              width: '5vw',
              border: '1px solid darkblue',
            }}
          >
            Drums: 
          </Typography>
          {props.drums.map(item => (
            <div 
              style={{
                width: `${Number(item.barCount)}vw`,
                height: '4vh',
                fontSize: '8px',
                wordWrap: 'break-word',
                backgroundColor: 'darkgray',
                border: '1px solid black',
              }}
            >
              {item.trackLink}
            </div>
          ))}
        </Grid>
        <Grid 
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '45vw',
            height: '4vh',
            marginLeft: '2.5vw',
          }}
        >
          <Typography
            sx={{
              width: '5vw',
              border: '1px solid darkblue',
            }}
          >
            Guitar: 
          </Typography>
          {props.guitar.map(item => (
            <div 
              style={{
                width: `${Number(item.barCount)}vw`,
                height: '4vh',
                fontSize: '8px',
                wordWrap: 'break-word',
                backgroundColor: 'lightcoral',
                border: '1px solid coral',
              }}
            >
              {item.trackLink}
            </div>
          ))}
        </Grid>
        <Grid 
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '45vw',
            height: '4vh',
            marginLeft: '2.5vw',
          }}
        >
          <Typography
            sx={{
              width: '5vw',
              border: '1px solid darkblue',
              fontSize: '11pt',
            }}
          >
            Keyboard: 
          </Typography>
          {props.keyboards.map(item => (
            <div 
              style={{
                width: `${Number(item.barCount)}vw`,
                height: '4vh',
                fontSize: '8px',
                wordWrap: 'break-word',
                backgroundColor: 'magenta',
                border: '1px solid purple',
              }}
            >
              {item.trackLink}
            </div>
          ))}
        </Grid>
        <Grid 
          item
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '45vw',
            height: '4vh',
            marginLeft: '2.5vw',
          }}
        >
          <Typography
            sx={{
              width: '5vw',
              border: '1px solid darkblue',
            }}
          >
            Vocals: 
          </Typography>
          {props.vocals.map(item => (
            <div 
              style={{
                width: `${Number(item.barCount)}vw`,
                height: '4vh',
                fontSize: '8px',
                wordWrap: 'break-word',
                backgroundColor: 'lightgreen',
                border: '1px solid green',
              }}
            >
              {item.trackLink}
            </div>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default ProjectDisplayMap