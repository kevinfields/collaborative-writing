import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { fontGrid } from '@mui/material/styles/cssUtils';
import React, { useState, useEffect, useDeferredValue } from 'react'
import Loading from '../components/Loading';
import CHANGE_USERNAME from '../reducers/CHANGE_USERNAME';

const ProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [nameChanger, setNameChanger] = useState({
    open: false,
    newName: '',
  });
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    await props.userRef.get().then((doc) => {
      setUserData(doc.data());
      setLoading(false);
    });
  };

  const openNameChanger = () => {
    setNameChanger({
      ...nameChanger,
      open: true,
    })
  };

  const saveNameChange = async () => {
    await CHANGE_USERNAME(props.userRef, props.takenNamesRef, nameChanger.newName).then(res => {
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
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className='page'>
      {loading ? 
        <Loading />
      :
        <Card>
          <Button onClick={() => props.goBack()}>Go Back</Button>
          <CardHeader title={`Name: ${userData.name}`} />
          { nameChanger.open === false ?
          <CardContent>
            <Typography>Name: {userData.username}</Typography>
            <Button onClick={() => openNameChanger()}>Change Name</Button>
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
        </Card>
      }
    </div>
  )

}

export default ProfilePage