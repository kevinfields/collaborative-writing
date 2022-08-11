import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import checkTurn from '../functions/checkTurn';
import TAKE_TURN from '../reducers/TAKE_TURN';

const SingleProjectPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [myTurn, setMyTurn] = useState(false);
  const { projectID } = useParams();

  const loadProject = async () => {
    
    let data;
    await props.currentProjectsRef.doc(projectID).get().then(doc => {
      data = doc.data();
      if (checkTurn(data.currentRound, data.order, props.username)) {
        setMyTurn(true);
      } else {
        setMyTurn(false);
      }
    });

    setProject(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, []);

  const takeTurn = async () => {

    if (props.username === '') {
      return;
    };

    await TAKE_TURN(props.currentProjectsRef.doc(projectID), props.username).then(() => {
      loadProject();
    })
  }

  return (
    <div className='page'>
      {loading ? 
        <Loading />
        :
        <Card>
          <Button onClick={() => props.goBack()}>Go Back</Button>
          <CardHeader title={projectID} />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1vw',
              flexWrap: 'wrap',
              width: '60vw',
              overflowY: 'scroll',
            }}
          >
            <Typography>Bass: {project.bass}</Typography>
            <Typography>Drums: {project.drums}</Typography>
            <Typography>Guitar: {project.guitar}</Typography>
            <Typography>Keyboards: {project.keyboards}</Typography>
            <Typography>Vocals: {project.vocals}</Typography>
            <Typography>Order: {project.order.join(' ')}</Typography>
            <Typography>Current Round: {project.currentRound}</Typography>
            {myTurn ? 
              <>
                <Typography>It is your turn!</Typography>
                <Button onClick={() => takeTurn()}>Take Turn</Button>
              </>
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