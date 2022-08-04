import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading';

const ProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    await props.userRef.get().then((doc) => {
      setUserData(doc.data());
      setLoading(false);
    });
  };

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