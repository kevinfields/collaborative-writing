import { Button, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import ProjectDisplayCard from '../components/ProjectDisplayCard';
import LOAD_PROJECTS from '../reducers/LOAD_PROJECTS';

const CurrentProjectsPage = (props) => {


  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    await LOAD_PROJECTS(props.userRef, props.currentProjectsRef).then(res => {

      setProjects(res.projects);
      props.setUsername(res.username);
      setLoading(false);
    })
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className='page'>
      <Button 
        onClick={() => props.goBack()}
        variant='contained'
        sx={{
          margin: '1vh',
        }}
      >
        Go Back
      </Button>
      {
        loading ?
          <Loading />
        : projects.length === 0 ?
          <Typography>You are not involved in any current projects.</Typography>
        :
          projects.map(item => (
            <ProjectDisplayCard 
              projectId={item.id}
              project={item}
              projectData={item.data}
              projectTitle={item.data.title ? item.data.title : ''}
              onSelect={() => props.chooseProject(item.id)}
            />
          ))
      }
    </div>
  )
}

export default CurrentProjectsPage