import React from 'react';
import PropTypes from "prop-types";
import { Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
      <Grid
        sx={{
          width: '50vw',
          display: 'flex',
          flexDirection: 'row',
          gap: '1vw',
          position: 'fixed',
          left: "25vw",
          top: '25vh',
          fontSize: '6pt',
        }}
      >
        <Button
          onClick={() => props.openCurrentProjects()}
          variant='contained'
          color='primary'
          className='tab-button'
        >
          Current Projects
        </Button>
        <Button
          onClick={() => props.openCompletedProjects()}
          variant='contained'
          color='secondary'
          className='tab-button'
        >
          Completed Projects
        </Button>
        <Button 
          onClick={() => props.createNewProject()}
          variant='contained'
          color='success'
          className='tab-button'
        >
          New Project
        </Button>
        <Button
          onClick={() => props.openProfile()}
          variant='contained'
          color='info'
          className='tab-button'
        >
          Open Profile
        </Button>
        <Button
          onClick={() => props.openAllUsersPage()}
          variant='contained'
          className='tab-button'
          color='warning'
        >
          All Users
        </Button>
      </Grid>
    </div>
  )
}

export default HomePageButtons