import { Button, Card, CardHeader } from '@mui/material'
import React from 'react'

const ProjectDisplayCard = (props) => {

  return (
    <Card>
      <CardHeader title={props.projectId} />
      <Button onClick={() => props.onSelect()}>Choose</Button>
    </Card>
  )
}

export default ProjectDisplayCard