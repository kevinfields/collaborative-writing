import { Button, Card, CardContent, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ACCEPT_FRIEND_REQUEST from '../reducers/ACCEPT_FRIEND_REQUEST';
import DECLINE_FRIEND_REQUEST from '../reducers/DECLINE_FRIEND_REQUEST';
import REMOVE_FRIEND from '../reducers/REMOVE_FRIEND';
import REMOVE_FRIEND_REQUEST from '../reducers/REMOVE_FRIEND_REQUEST';
import SEND_FRIEND_REQUEST from '../reducers/SEND_FRIEND_REQUEST';

const AllUsersPage = (props) => {

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const reloadUserData = async () => {
    await props.userRef.get().then(doc => {
      setUserData(doc.data());
    });
  }

  const loadAllUsers = async () => {

    let friendList = [];
    let requests = [];
    let requested = [];
    let userList = [];

    await props.userRef.get().then(doc => {
      friendList = [...doc.data().friends];
      requests = [...doc.data().receivedFriendRequests];
      requested = [...doc.data().sentFriendRequests];
      setUserData(doc.data());
    });



    await props.usersRef.get().then(snap => {
      snap.forEach(doc => {
        userList.push({
          id: doc.id,
          name: doc.data().name,
          instruments: doc.data().instruments,
        });
      })
    });
    setFriends(friendList);
    setReceivedRequests(requests);
    setSentRequests(requested);
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const removeFriend = async (id) => {
    await REMOVE_FRIEND(userData, props.userRef, props.uid, props.usersRef.doc(id), id);
    setFriends(friends.filter(item => id !== item));
    reloadUserData();
  };

  const removeFriendRequest = async (id) => {
    await REMOVE_FRIEND_REQUEST(userData, props.userRef, props.uid, props.usersRef.doc(id), id);
    setSentRequests(sentRequests.filter(item => item !== id));
    reloadUserData();
  };

  const acceptRequest = async (id) => {
    await ACCEPT_FRIEND_REQUEST(userData, props.userRef, props.uid, props.usersRef.doc(id), id);
    setFriends(friends.concat(id));
    setReceivedRequests(receivedRequests.filter(item => item !== id));
    reloadUserData();
  };

  const declineRequest = async (id) => {
    await DECLINE_FRIEND_REQUEST(userData, props.userRef, props.uid, props.usersRef.doc(id), id);
    setReceivedRequests(receivedRequests.filter(item => item !== id));
    reloadUserData();
  };

  const sendRequest = async (id) => {
    await SEND_FRIEND_REQUEST(userData, props.userRef, props.uid, props.usersRef.doc(id), id);
    setSentRequests(sentRequests.concat(id));
    reloadUserData();
  }

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
          {users.map(user => (
            <CardContent>
              <Typography>Name: {user.name} {"(id: "}{user.id}{")"}</Typography>
              <div className='user-instrument-list'>
                Instruments: {user.instruments.map(item => (
                  <Typography>{item}</Typography>
                ))}
              </div>
              { props.uid === user.id ?
                <Button 
                  onClick={() => props.openProfile()}
                  variant='contained'
                  color='secondary'
                >
                  Open My Profile
                </Button>
              : friends.includes(user.id) ?
                <Button 
                  onClick={() => removeFriend(user.id)}
                  variant='contained'
                  color='error'
                >
                  Remove Friend
                </Button>
              : sentRequests.includes(user.id) ?
                <Button 
                  onClick={() => removeFriendRequest(user.id)}
                  variant='contained'
                  color='error'
                >
                  Undo Request
                </Button>
              : receivedRequests.includes(user.id) ?
                <>
                  <Button 
                    onClick={() => acceptRequest(user.id)}
                    variant='contained'
                    color='success'
                  >
                    Accept Request
                  </Button>
                  <Button 
                    onClick={() => declineRequest(user.id)}
                    variant='contained'
                    color='error'
                  >
                    Decline Request
                  </Button>
                </>
              :
                <Button 
                  onClick={() => sendRequest(user.id)}
                  variant='contained'
                  color='success'
                >
                  Add Friend
                </Button>
              }
              { props.uid !== user.id ?
                <Button 
                  onClick={() => navigate(`/users/${user.id}`)}
                  variant='contained'
                  color='secondary'
                  sx={{
                    margin: '1vh',
                  }}
                >
                  View Profile
                </Button>
              : null
              }
            </CardContent>
          ))}
        </Card>
      }
    </div>
  )
}

export default AllUsersPage