import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const SingleProjectPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [myTurn, setMyTurn] = useState(false);
  const [username, setUsername] = useState('');
  const { projectID } = useParams();

  const loadProject = async () => {

    const loadUser = async () => {
      let user;
      await props.userRef.get().then(doc => {
        user = doc.data();
      });
      setUsername(user.username);
      return username;
    }

    const checkTurn = (round, order, name) => {

      console.log('round: ' + round);
      console.log('order: ' + order);
      console.log('name: ' + name);
      
      if (order[round % order.length] === name) {
        setMyTurn(true);
      }
    }

    const userNameTag = await loadUser();

    let data;
    await props.currentProjectsRef.doc(projectID).get().then(doc => {
      data = doc.data();
      checkTurn(data.currentRound, data.order, userNameTag);
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
          <Button onClick={() => props.goBack()}>Go Back</Button>
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
            {myTurn ? 
              <Typography>It is your turn!</Typography>
            : 
              <Typography>You must wait for your turn.</Typography>
            }
          </CardContent>
        </Card>
      }
    </div>
  )
}

export default SingleProjectPage