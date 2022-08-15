import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProjectDisplayMap from '../components/ProjectDisplayMap';
import checkTurn from '../functions/checkTurn';
import LOAD_PROJECT_LAYOUT from '../reducers/LOAD_PROJECT_LAYOUT';
import TAKE_TURN from '../reducers/TAKE_TURN';

const SingleProjectPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [myTurn, setMyTurn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [turnObject, setTurnObject] = useState({
    barCount: -1,
    barIndices: [0],
    trackLink: '',
  });
  const [projectLayout, setProjectLayout] = useState({});
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

    await LOAD_PROJECT_LAYOUT(props.currentProjectsRef.doc(projectID)).then(res => {
      setProjectLayout(res);
    });

    setProject(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {

    console.log('project.turnOf: ' + project.turnOf )
  }, [project]);


  useEffect(() => {

    if (submitting) {

      const linkName = prompt('Please provide a link');
      const barLength = prompt('Please enter the number of bars this clip covers.');
      const barArrayStart = prompt('Please enter the number of the first bar in the clip.');

      let barArray = [Number(barArrayStart)];

      for (let i=1; i<barLength; i++) {
        barArray.push(Number(barArray[i-1]) + 1);
      };

      setTurnObject({
        trackLink: linkName,
        barCount: Number(barLength),
        barIndices: barArray,
      });
    }

  }, [submitting]);


  useEffect(() => {

    if (turnObject.barCount > 0 && turnObject.trackLink !== '') {
      takeTurn();
    }

  }, [turnObject])


  const takeTurn = async () => {

    if (props.username === '') {
      return;
    };

    const instrumentsObject = {
      bass: project.bass,
      drums: project.drums,
      guitar: project.guitar,
      keyboards: project.keyboards,
      vocals: project.vocals,
    };

    let instrumentChoices = [];

    for (const instrument in instrumentsObject) {
      if (instrumentsObject[instrument] === props.username) {
        instrumentChoices.push(instrument);
      };
    };

    const instrumentChoice = prompt('Pick a track type from this list ' + instrumentChoices.join(', '));
    await TAKE_TURN(props.currentProjectsRef.doc(projectID), turnObject, instrumentChoice, props.username).then(() => {
      setSubmitting(false);
      loadProject();
    });

  };

  


  return (
    <div className='page'>
      {loading ? 
        <Loading />
        :
        <Card
          sx={{
            width: '95%',
            marginLeft: '2.5%',
            height: '70vh',
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
          <Grid
            container
            spacing={1}
            columns={16}
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <CardHeader 
                title={project.title}
                sx={{
                  marginLeft: '2.5vw',
                }}
              />
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Typography
                sx={{
                  marginLeft: '2.5vw',
                }}
              >
                Project Id: {projectID}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{
                marginLeft: '2.5vw',
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
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
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '2.5vw',
                  width: '30vw',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '0.5vw',
                  }}
                >
                  <Typography>Order: </Typography>
                  {project.order.map(item => (
                    <Typography
                      className={item === project.turnOf ? 'current-turn' : null}
                    >
                      {item}
                    </Typography>
                  ))}
                </div>
                <Typography>Current Round: {project.currentRound + 1}</Typography>
              </div>
            </Grid>
              {myTurn ? 
                <Grid 
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{
                    marginLeft: '2.5vw',
                  }}
                >
                  <Typography>It is your turn!</Typography>

                  <Button 
                    onClick={() => setSubmitting(true)}
                    variant='contained'
                  >
                    Take Turn
                  </Button>
                </Grid>
              : 
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{
                    marginLeft: '2.5vw',
                  }}
                >
                  <Typography>You must wait for your turn.</Typography>
                </Grid>
              }
          </Grid>
          {projectLayout !== {} ? 
            <ProjectDisplayMap
              bass={projectLayout.bass}
              drums={projectLayout.drums}
              guitar={projectLayout.guitar}
              keyboards={projectLayout.keyboards}
              vocals={projectLayout.vocals}
            />
            : null
          }
        </Card>
      }
    </div>
  )
}

export default SingleProjectPage