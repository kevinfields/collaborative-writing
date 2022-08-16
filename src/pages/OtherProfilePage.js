import { Card, CardHeader, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';

const OtherProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();

  const loadUser = async () => {
    let data;
    await props.usersRef.doc(userID).get().then(doc => {
      data = doc.data();
    });

    setUserData(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <div className='page'>
      { loading ? <Loading /> :
      <Card>
        <CardHeader title={userData.username} />
        <div className='profile-data-section'>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Instruments: {userData.instruments.join(' , ')}</Typography>
        </div>
      </Card>
      }
    </div>
  )
}

export default OtherProfilePage;