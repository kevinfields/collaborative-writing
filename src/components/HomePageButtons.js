import React from 'react';
import { Button, Grid, Typography } from "@mui/material";

const HomePageButtons = (props) => {

  return (
    <div>
      <Typography 
        variant='h4'
        align='center'
        style={{
          color: 'blue',
          marginTop: '2vh',
        }}
      >
        Welcome to Collaborative Writing
      </Typography>
      <Grid>
        <Button
          onClick={() => props.openCurrentProjects()}
        >
          Current Projects
        </Button>
        <Button
          onClick={() => props.openCompletedProjects()}
        >
          Completed Projects
        </Button>
        <Button 
          onClick={() => props.createNewProject()}
        >
          New Project
        </Button>
        <Button
          onClick={() => props.openProfile()}
        >
          Open Profile
        </Button>
        <Button
          onClick={() => props.openAllUsersPage()}
        >
          All Users
        </Button>
      </Grid>
    </div>
  )
}

export default HomePageButtons