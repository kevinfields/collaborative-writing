import { Card, CardHeader } from '@mui/material'
import React from 'react'

const ProjectDisplayCard = (props) => {

  return (
    <Card>
      <CardHeader title={props.projectId} />
    </Card>
  )
}

export default ProjectDisplayCard