import { Button, Card, CardContent, CardHeader, Grid, Switch, TextField, Typography } from '@mui/material';
import React, { useState, useEffect} from 'react'
import Loading from '../components/Loading';
import CHANGE_USERNAME from '../reducers/CHANGE_USERNAME';

const ProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [nameChanger, setNameChanger] = useState({
    open: false,
    newName: '',
  });
  const [instruments, setInstruments] = useState({
    bass: false,
    drums: false,
    guitar: false,
    keyboards: false,
    vocals: false,
  });
  const [loading, setLoading] = useState(true);
  const [originalInstruments, setOriginalInstruments] = useState({
    bass: false,
    drums: false,
    guitar: false,
    keyboards: false,
    vocals: false,
  });
  const [savedChanges, setSavedChanges] = useState(true);

  const loadUserData = async () => {
    await props.userRef.get().then((doc) => {
      setUserData(doc.data());
      setLoading(false);
    

    let instrumentBooleanCatcher = {
      bass: false,
      drums: false,
      guitar: false,
      keyboards: false,
      vocals: false,
    }

    if (doc.data().instruments.includes('bass')) {
      instrumentBooleanCatcher.bass = true;
    }
    if (doc.data().instruments.includes('drums')) {
      instrumentBooleanCatcher.drums = true;
    }
    if (doc.data().instruments.includes('guitar')) {
      instrumentBooleanCatcher.guitar = true;
    }
    if (doc.data().instruments.includes('keyboards')) {
      instrumentBooleanCatcher.keyboards = true;
    }
    if (doc.data().instruments.includes('vocals')) {
      instrumentBooleanCatcher.vocals = true;
    }
    setOriginalInstruments(instrumentBooleanCatcher);
    setInstruments(instrumentBooleanCatcher);
    setSavedChanges(true);
    });
  };

  

  const openNameChanger = () => {
    setNameChanger({
      ...nameChanger,
      open: true,
    })
  };

  const saveNameChange = async () => {
    await CHANGE_USERNAME(props.userRef, props.takenNamesRef, nameChanger.newName, props.currentProjectsRef).then(res => {
      if (!res) {
        alert('That name is already taken.');
      } else {
        props.goBack();
      }
    })
  };

  const closeNameChanger = () => {
    setNameChanger({
      newName: '',
      open: false,
    })
  };

  const saveInstrumentChanges = async () => {


    let instrumentArray = [];

    for (const instrument in instruments) {
      if (instruments[instrument] === true) {
        instrumentArray.push(instrument);
      }
    };

    let data;
    await props.userRef.get().then(doc => {
      data = doc.data();
    });

    if (data.instruments !== instrumentArray) {
      await props.userRef.set({
        ...data,
        instruments: instrumentArray,
      })
    };

    setSavedChanges(true);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (instruments !== originalInstruments) {
      setSavedChanges(false);
    }
  }, [instruments])

  return (
    <div className='page'>
      {loading ? 
        <Loading />
      :
        <Card>
          <Button 
            onClick={() => props.goBack()}
            variant='contained'
            sx={{
              margin: '1vh',
            }}
          >
            Go Back
          </Button>
          <CardHeader title={`Name: ${userData.name}`} />
          { nameChanger.open === false ?
          <CardContent>
            <Typography>Username: {userData.username}</Typography>
            <Button 
              onClick={() => openNameChanger()}
              variant='outlined'
            >
              Change Name
            </Button>
          </CardContent>
          :
          <CardContent>
            <Typography>New Name: </Typography>
            <TextField
              value={nameChanger.newName}
              onChange={(e) => setNameChanger({...nameChanger, newName: e.target.value})}
            />
            <Button onClick={() => saveNameChange()}>Save</Button>
            <Button onClick={() => closeNameChanger()}>Close</Button>
          </CardContent>
          }
          <div
            style={{
              width: '30vw',
              border: '1px solid red',
              borderRadius: '5px',
              overflowX: 'scroll',
            }}
          >
          <CardContent>
            Friends: {userData.friends.map(item => (
              <Typography>{item}</Typography>
            ))}
          </CardContent>
          <CardContent>
            Current Projects: {userData.currentProjectIds.map(item => (
              <Typography>{item}</Typography>
            ))}
          </CardContent>
          <CardContent>
            Completed Projects: {userData.completedProjectIds.map(item => (
              <Typography>{item}</Typography>
            ))}
          </CardContent>
          </div>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '25vw',
              height: '40vh',
              overflowY: 'scroll',
              float: 'right',
              marginTop: '-45vh',
              border: '1px solid blue',
              borderRadius: '5px',
            }}
          >
            <Typography
              sx={{
                marginRight: '2vw',
                marginBottom: '2vh',
              }}
            >
              Select The Instruments You Can Play
            </Typography>
            <Grid 
              container
              columns={12}
              columnSpacing={4}
            >
              <Grid
                item
                lg={6}
              >
                <Typography>
                  Bass: 
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Switch
                  checked={instruments.bass}
                  onChange={() => setInstruments({...instruments, bass: !instruments.bass})}
                  sx={{
                    marginLeft: '3.5vw',
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <Typography>Drums: </Typography>
              </Grid>
              <Grid item lg={6}>
                <Switch
                  checked={instruments.drums}
                  onChange={() => setInstruments({...instruments, drums: !instruments.drums})}
                  sx={{
                    marginLeft: '3.5vw',
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <Typography>Guitar: </Typography>
              </Grid>
              <Grid item lg={6}>
              <Switch
                checked={instruments.guitar}
                onChange={() => setInstruments({...instruments, guitar: !instruments.guitar})}
                sx={{
                  marginLeft: '3.5vw',
                }}
              />
              </Grid>
              <Grid item lg={6}>
                <Typography>Keyboards: </Typography>
              </Grid>
              <Grid item lg={6}>
                <Switch
                  checked={instruments.keyboards}
                  onChange={() => setInstruments({...instruments, keyboards: !instruments.keyboards})}
                  sx={{
                    marginLeft: '3.5vw',
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <Typography>Vocals: </Typography>
              </Grid>
              <Grid item lg={6}>
                <Switch
                  checked={instruments.vocals}
                  onChange={() => setInstruments({...instruments, vocals: !instruments.vocals})}
                  sx={{
                    marginLeft: '3.5vw',
                  }}
                />
              </Grid>
            </Grid>
            { originalInstruments === instruments ? null 
            : !savedChanges ?
              <Button 
                onClick={() => saveInstrumentChanges()}
                variant='outlined'
              >
                Save Changes
              </Button>
              :
              <Button
                disabled
                variant='success'
              >
                Changes Saved
              </Button>
            }
          </CardContent>
        </Card>
      }
    </div>
  )

}

export default ProfilePage