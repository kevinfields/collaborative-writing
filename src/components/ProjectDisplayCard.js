import { Button, Card, CardHeader, Typography } from '@mui/material'
import React from 'react'

const ProjectDisplayCard = (props) => {

  return (
    <Card
      style={{
        width: '40vw',
        height: '20vh',
        overflowY: 'scroll',
        padding: '1vw',
        margin: '1vw',
        border: '1px solid red',
        backgroundColor: 'darkgray',
      }}
    >
      <CardHeader title={props.projectTitle} />
      <Typography>{props.projectId}</Typography>
      <Button 
        onClick={() => props.onSelect()}
        sx={{


        }}
        variant='contained'
      >
        Choose
      </Button>
    </Card>
  )
}

export default ProjectDisplayCard