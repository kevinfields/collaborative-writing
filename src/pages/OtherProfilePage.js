import { Button, Card, CardHeader, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import FriendActions from '../components/FriendActions';

const OtherProfilePage = (props) => {

  const [myData, setMyData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();
  const navigate = useNavigate();

  const otherUserRef = props.usersRef.doc(userID);

  const loadUser = async () => {
    let data;
    await otherUserRef.get().then(doc => {
      data = doc.data();
    });

    setUserData(data);
    setLoading(false);
  };

  const loadSelf = async () => {

    await props.userRef.get().then(doc => {
      setMyData(doc.data());
    })
  };

  useEffect(() => {
    loadSelf();
    loadUser();
  }, []);

  return (
    <div className='page'>
      <Button 
        onClick={() => navigate('/all_users')}
        sx={{
          margin: '1vh',
        }}
        variant='contained'
      >
        Go Back
      </Button>
      { loading ? <Loading /> :
      <Card>
        <CardHeader title={userData.username} />
        <div className='profile-data-section'>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Instruments: {userData.instruments.join(' , ')}</Typography>
          <FriendActions 
            userData={myData}
            userRef={props.userRef}
            uid={props.uid}
            otherUserRef={otherUserRef}
            otherId={userID}
            loadUser={() => loadUser()}
          />
        </div>
      </Card>
      }
    </div>
  )
}

export default OtherProfilePage;