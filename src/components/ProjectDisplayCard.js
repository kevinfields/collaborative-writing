import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'

const ProjectDisplayCard = (props) => {

  return (
    <Card
      style={{
        width: '40vw',
        height: '30vh',
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
        <CardHeader 
          title={props.projectTitle ? props.projectTitle : ''}
          sx={{
            width: '35vw',
            fontSize: '15pt',
            height: '10vh',
            border: "1px solid magenta",
          }}
        />
        </Grid>
        
        {/* <Grid item>
          <Typography
            sx={{
              margin: '1vh',
              width: '15vw',
              height: '10vh',
            }}
          >
            {props.projectId}
          </Typography>
        </Grid> */}
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