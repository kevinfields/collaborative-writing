import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ACCEPT_FRIEND_REQUEST from '../reducers/ACCEPT_FRIEND_REQUEST';
import DECLINE_FRIEND_REQUEST from '../reducers/DECLINE_FRIEND_REQUEST';
import GET_FRIEND_ACTIONS from '../reducers/GET_FRIEND_ACTIONS';
import REMOVE_FRIEND from '../reducers/REMOVE_FRIEND';
import REMOVE_FRIEND_REQUEST from '../reducers/REMOVE_FRIEND_REQUEST';
import SEND_FRIEND_REQUEST from '../reducers/SEND_FRIEND_REQUEST';
import Loading from './Loading';

const FriendActions = (props) => {

  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState('');

  useEffect(() => {
    getFriendActions();
  }, [])  

  const getFriendActions = async () => {

    const actionType = await GET_FRIEND_ACTIONS(props.userRef, props.otherUserRef);
    setActions(actionType);
    setLoading(false);
  };

  const acceptFriendRequest = async () => {
    await ACCEPT_FRIEND_REQUEST(props.userData, props.userRef, props.uid, props.otherUserRef, props.otherId).then(() => {
      props.loadUser();
    })
  };

  const denyFriendRequest = async () => {
    await DECLINE_FRIEND_REQUEST(props.userData, props.userRef, props.uid, props.otherUserRef, props.otherId).then(() => {
      props.loadUser();
    })
  };

  const retractFriendRequest = async () => {
    await REMOVE_FRIEND_REQUEST(props.userData, props.userRef, props.uid, props.otherUserRef, props.otherId).then(() => {
      props.loadUser();
    })
  };

  const removeFriend = async () => {
    await REMOVE_FRIEND(props.userData, props.userRef, props.uid, props.otherUserRef, props.otherId).then(() => {
      props.loadUser();
    })
  };

  const sendFriendRequest = async () => {
    await SEND_FRIEND_REQUEST(props.userData, props.userRef, props.uid, props.otherUserRef, props.otherId).then(() => {
      props.loadUser();
    })
  };

  return (
    <div>
      {
        loading ? <Loading />
        : actions === 'accept or deny' ?
          <>
            <Button 
              onClick={() => acceptFriendRequest()}
              variant='contained'
            >
              Accept
            </Button>
            <Button 
              onClick={() => denyFriendRequest()}
              variant='contained'
            >
                Deny
              </Button>
          </>
        : actions === 'retract' ?
          <>
            <Button 
              onClick={() => retractFriendRequest()}
              variant='contained'
            >
              Remove Request
            </Button>
          </>
        : actions === 'remove' ?
          <>
            <Button 
              onClick={() => removeFriend()}
              variant='contained'
            >
              Remove Friend
            </Button>
          </>
        : actions === 'add' ?
          <>
            <Button 
              onClick={() => sendFriendRequest()}
              variant='contained'
            >
              Send Request
            </Button>
          </>
        : null
      }
    </div>
  )
}

export default FriendActions