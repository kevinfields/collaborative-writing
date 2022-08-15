import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProjectDisplayMap from '../components/ProjectDisplayMap';
import QuestionModal from '../components/QuestionModal';
import checkTurn from '../functions/checkTurn';
import LOAD_PROJECT_LAYOUT from '../reducers/LOAD_PROJECT_LAYOUT';
import TAKE_TURN from '../reducers/TAKE_TURN';

const SingleProjectPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [myTurn, setMyTurn] = useState(false);
  const [myInstruments, setMyInstruments] = useState([]);
  const [submitting, setSubmitting] = useState({
    link: false,
    barCount: false,
    firstBar: false,
    instrument: false,
    final: false,
  });
  const [turnObject, setTurnObject] = useState({
    barCount: -1,
    barIndices: [0],
    trackLink: '',
    instrument: '',
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

    console.log('project.turnOf: ' + project.turnOf );
    let catcher = [];

    if (project.turnOf === props.username) {
      for (const instrument in project) {
        if (instrument !== 'turnOf') {
          if (project[instrument] === props.username){
            catcher.push(instrument);
          }
        }
      }
      setMyInstruments(catcher);
    };
  }, [project]);

  useEffect(() => {

    if (!submitting.final && !submitting.barCount && !submitting.firstBar && !submitting.link && !submitting.instrument && turnObject.trackLink !== '') {
      setTurnObject({
        barCount: -1,
        barIndices: [0],
        trackLink: '',
        instrument: '',
      });
    }
  }, [submitting])


  // useEffect(() => {

  //   if (submitting) {

  //     const linkName = prompt('Please provide a link');
  //     const barLength = prompt('Please enter the number of bars this clip covers.');
  //     const barArrayStart = prompt('Please enter the number of the first bar in the clip.');

  //     let barArray = [Number(barArrayStart)];

  //     for (let i=1; i<barLength; i++) {
  //       barArray.push(Number(barArray[i-1]) + 1);
  //     };

     

  //     setTurnObject({
  //       trackLink: linkName,
  //       barCount: Number(barLength),
  //       barIndices: barArray,
  //     });
  //   }

  // }, [submitting]);


  // useEffect(() => {

  //   if (turnObject.barCount > 0 && turnObject.trackLink !== '') {
  //     takeTurn();
  //   }

  // }, [turnObject])


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

    
    await TAKE_TURN(props.currentProjectsRef.doc(projectID), turnObject, turnObject.instrument, props.username).then(() => {
      setSubmitting({
        ...submitting,
        final: false,
      });
      loadProject();
    });

  };

  const receiveResponse = (response, type) => {

    switch (type) {
      case 'link':
        setTurnObject({
          ...turnObject,
          trackLink: response,
        });
        setSubmitting({...submitting, link: false, barCount: true})
        break;
      case 'count':
        setTurnObject({
          ...turnObject,
          barCount: Number(response),
        });
        setSubmitting({...submitting, barCount: false, firstBar: true})
        break;
      case 'first':
        let indicesCatcher = [];
        for (let i=Number(response); i<Number(response) + Number(turnObject.barCount); i++) {
          indicesCatcher.push(Number(i));
        }
        setTurnObject({
          ...turnObject,
          barIndices: indicesCatcher,
        });
        setSubmitting({...submitting, firstBar: false, instrument: true})
        break;
      case 'instrument':
        setTurnObject({
          ...turnObject,
          instrument: response,
        });
        setSubmitting({...submitting, instrument: false, final: true})
        break;
      case 'final':
        takeTurn();
        break;
      default:
        break;
    }
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
          {
            submitting.link ?
            <QuestionModal
              open={submitting.link}
              onClose={() => setSubmitting({...submitting, link: false})}
              header={'Track Link'}
              description={'Please provide a track link url.'}
              onRespondText={(link) => receiveResponse(link, 'link')}
            />
            : submitting.barCount ?
            <QuestionModal
              open={submitting.barCount}
              onClose={() => setSubmitting({...submitting, barCount: false})}
              header={'Bar Count'}
              description={'Please enter the number of bars your clip covers.'}
              onRespondNumerical={(count) => receiveResponse(count, 'count')}
            />
            : submitting.firstBar ?
            <QuestionModal
              open={submitting.firstBar}
              onClose={() => setSubmitting({...submitting, firstBar: false})}
              header={'First Bar'}
              description={'Please enter the index of the first bar covered in your clip'}
              onRespondNumerical={(first) => receiveResponse(first, 'first')}
            />
            : submitting.instrument ?
            <QuestionModal
              open={submitting.instrument}
              onClose={() => setSubmitting({...submitting, instrument: false})}
              header={'Instrument'}
              description={'Please pick the instrument used in this track.'}
              onRespondOptions={(instrument) => receiveResponse(instrument, 'instrument')}
              options={myInstruments}
            />
            : submitting.final ?
            <QuestionModal
              open={submitting.final}
              onClose={() => setSubmitting({...submitting, final: false})}
              header={'Are you sure?'}
              description={'Are you sure you want to submit this clip, with this information?'}
              onAccept={() => receiveResponse(true, 'final')}
            />
            : null
          }
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
                    onClick={() => setSubmitting({...submitting, link: true})}
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