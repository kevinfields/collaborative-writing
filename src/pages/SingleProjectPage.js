import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const SingleProjectPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const { projectID } = useParams();

  const loadProject = async () => {

    let data;
    await props.currentProjectsRef.doc(projectID).get().then(doc => {
      data = doc.data();
    });

    setProject(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, [])

  return (
    <div className='page'>
      {loading ? 
        <Loading />
        :
        <Card>
          <CardHeader title={project.id} />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1vw',
            }}
          >
            <Typography>Bass: {project.bass}</Typography>
            <Typography>Drums: {project.drums}</Typography>
            <Typography>Guitar: {project.guitar}</Typography>
            <Typography>Keyboards: {project.keyboards}</Typography>
            <Typography>Vocals: {project.vocals}</Typography>
          </CardContent>
        </Card>
      }
    </div>
  )
}

export default SingleProjectPage