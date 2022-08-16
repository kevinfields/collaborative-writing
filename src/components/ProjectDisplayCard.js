import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React, {useEffect} from 'react'

const ProjectDisplayCard = (props) => {

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObject = new Date(props.projectData.date.seconds * 1000);
  const lastUpdateObject = new Date(props.projectData.lastUpdated.seconds * 1000);


  return (
    <Card
      style={{
        width: '40vw',
        height: '35vh',
        padding: '1vw',
        margin: '1vw',
        border: '1px solid blue',
        boxShadow: '1px 1px lightblue',
        backgroundColor: 'darkblue',
        color: 'white',
      }}
    >
      <Grid
        container
        columns={12}
        columnSpacing={1}
        rowSpacing={0.5}
        direction='row'
        justifyContent='space-evenly'
      >
        <Grid 
          item
          md={12}
          sm={12}
          xs={12}
          lg={12}
          xl={12}
        >
        <CardContent
          sx={{
            width: '35vw',
            fontSize: '15pt',
            height: '10vh',
            border: "1px solid magenta",
          }}
        >
          <CardHeader 
            title={props.projectTitle ? props.projectTitle : ''} 
          />
          <Typography 
            sx={{
              float: 'right',
              fontSize: '7pt',
              marginRight: '4vw',
            }}
          >
            Last Updated {(lastUpdateObject).toLocaleDateString('en-US', dateOptions)}
          </Typography>
          <Typography
            sx={{
              float: 'right',
              fontSize: '7pt',
              marginRight: '4vw',
            }}
          >
            Created {(dateObject).toLocaleDateString('en-US', dateOptions)}
          </Typography>
        </CardContent>
        </Grid>
        <Grid 
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
        >
          <CardContent className='order-array'>
            {props.projectData.order.map(item => (
              <Typography
                className={item === props.projectData.turnOf ? 'current-turn' : 'dugout'}
              >
                {item}
              </Typography>
              ))
            }
          </CardContent>
        </Grid>
        <Grid 
          item
          md={6}
          sm={6}
          lg={6}
        >
          <Button 
            onClick={() => props.onSelect()}
            sx={{
              float: 'right',
            }}
            variant='contained'
          >
            Choose
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ProjectDisplayCard