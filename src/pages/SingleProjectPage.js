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

  useEffect(() => {

    console.log('project.turnOf: ' + project.turnOf )
  }, [project])

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
        <Card
          sx={{
            width: '95%',
            marginLeft: '2.5%',
            height: '60%',
            border: '1px solid blue',
          }}
        >
          <Button 
            onClick={() => props.goBack()}
            variant='contained'
            sx={{
              margin: '1vh',
            }}
          >
            Go Back
          </Button>
          <CardHeader title={project.title} />
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
            <Typography>Project Id: {projectID}</Typography>
            <Typography
              sx={{
                color: project.bass === project.turnOf ? 'red' : 'black',
              }}
            >
              Bass: {project.bass}
            </Typography>
            <Typography
              sx={{
                color: project.drums === project.turnOf ? 'red' : 'black',
              }}
            >
              Drums: {project.drums}
            </Typography>
            <Typography
              sx={{
                color: project.guitar === project.turnOf ? 'red' : 'black',
              }}
            >
              Guitar: {project.guitar}
            </Typography>
            <Typography
              sx={{
                color: project.keyboards === project.turnOf ? 'red' : 'black',
              }}
            >
              Keyboards: {project.keyboards}
            </Typography>
            <Typography
              sx={{
                color: project.vocals === project.turnOf ? 'red' : 'black',
              }}
            >
              Vocals: {project.vocals}
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '5vw',
              }}
            >
              <Typography>Order: {project.order.join(' ')}</Typography>
              <Typography>Current Round: {project.currentRound}</Typography>
            </div>
            {myTurn ? 
              <>
                <Typography>It is your turn!</Typography>
                <Button 
                  onClick={() => takeTurn()}
                  variant='contained'
                >
                  Take Turn
                </Button>
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