import { Button, Card, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, {useEffect, useState, useId} from 'react';
import { useNavigate } from 'react-router-dom';
import generateId from '../functions/generateId';
import CREATE_PROJECT from '../reducers/CREATE_PROJECT';



const NewProjectPage = (props) => {

  const [members, setMembers] = useState({
    bass: '',
    drums: '',
    guitar: '',
    keyboards: '',
    vocals: '',
  });

  const [creator, setCreator] = useState({});
  const [allFriends, setAllFriends] = useState([]);

  const [roleLists, setRoleLists] = useState({
    bass: [],
    drums: [],
    guitar: [],
    keyboards: [],
    vocals: [],
  });

  const [title, setTitle] = useState('');

  const [allowCreate, setAllowCreate] = useState(false);
  const navigate = useNavigate();

  const loadAllFriends = async () => {

    let friendList = [];
    let friendObjects = [];
    await props.userRef.get().then(doc => {
      friendList = doc.data().friends;
    })

    friendList.push(props.uid)

    for (const user of friendList) {
      await props.usersRef.doc(user).get().then(doc => {
        friendObjects.push({
          id: user,
          data:  doc.data(),
        });

        if (user === props.uid) {
          setCreator(doc.data().username);
        };
      });
    }

    setAllFriends([...friendObjects]);
    return true;
  };

  const getIdFromUsername = (username) => {
    const friend = allFriends.find(friend => friend.data.username === username);
    return friend.id;
  }

  useEffect(() => {
    loadAllFriends();
  }, []);

  useEffect(() => {
    if (allFriends.length > 0) {
      loadRoles();
    }
  }, [allFriends])

  const loadRoles = async () => {

    let bass = [];
    let drums = [];
    let guitar = [];
    let keyboards = [];
    let vocals = [];

    for (const friend of allFriends) {
      await props.usersRef.doc(friend.id).get().then(doc => {
          const obj = doc.data();
          if (obj.instruments.includes('bass')) {
            bass.push({username: friend.data.username, id: friend.id});
          }

          if (obj.instruments.includes('drums')) {
            drums.push({username: friend.data.username, id: friend.id});
          }

          if (obj.instruments.includes('guitar')) {
            guitar.push({username: friend.data.username, id: friend.id})
          }

          if (obj.instruments.includes('keyboards')) {
            keyboards.push({username: friend.data.username, id: friend.id})
          }
          if (obj.instruments.includes('vocals')) {
            vocals.push({username: friend.data.username, id: friend.id});
          }
        })
    }
    setRoleLists({
      bass: bass,
      drums: drums,
      guitar: guitar,
      keyboards: keyboards,
      vocals: vocals,
    });
  };

  useEffect(() => {

    if (
      members.vocals !== '' && 
      members.keyboards !== '' && 
      members.guitar !== '' && 
      members.drums !== '' && 
      members.bass !== ''
    )  {
      setAllowCreate(true);
    };

  }, [members]);

  useEffect(() => {

    if (title.length >= 40) {
      setTitle(title.substring(0, 40));
    }
  }, [title]);



  const createNewProject = async () => {

    if (title === '') {
      alert('You must have a valid title');
      return;
    }

    let teamIds = [];
    let namesArr = [];
    let order = [];

    for (const instrument in members) {
      if (!teamIds.includes(members[instrument].id)) {
        teamIds.push(members[instrument].id);
        namesArr.push(members[instrument].username);
      };
    };

    if (teamIds.length > 5) {
      order = namesArr;
    } else {
      order = namesArr.reverse();
    }

    if (!teamIds.includes(props.uid)) {
      alert('You must play a role in this project!');
      return;
    }

    const generatedId = generateId(title, props.uid)

    const projectObject = {

      data: {
        bass: members.bass.username,
        drums: members.drums.username,
        guitar: members.guitar.username,
        keyboards: members.keyboards.username,
        vocals: members.vocals.username,
        teamIds: teamIds,
        order: order,
        currentRound: 0,
        title: title,
        turnOf: order[0],
        creatorId: props.uid,
        creatorName: creator,
      },
      id: generatedId,
    };


    let userRefs = [];

    for (const user of teamIds) {
      userRefs.push(props.usersRef.doc(user));
    }

    await CREATE_PROJECT(projectObject, props.currentProjectsRef, userRefs);
    navigate(`/${props.uid}/current_projects/${generatedId}/`);
    
  }

  return (
    <div className='page'>
      <Button 
        onClick={() => props.goBack()}
        variant='contained'
        sx={{
          margin: '1vh',
        }}
      >
        Go Back
      </Button>
      <Typography
        sx={{
          marginLeft: '2.5vw',
        }}
      >
        Title: 
      </Typography>
      <TextField 
        sx={{
          marginLeft: '2.5vw',
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='select-flexbox'>
        <div className='select-flexbox-item'>
        <Typography>Choose a Bassist: </Typography>
        <TextField
          select
          value={members.bass.username}
          onChange={(e) => setMembers({...members, bass: {username: e.target.value, id: getIdFromUsername(e.target.value)}})}
          className='select-flexbox-bar'
        >
          {roleLists.bass.map(item => (
            <MenuItem value={item.username}>{item.username}</MenuItem>
          ))}
        </TextField>
        </div>
        <div className='select-flexbox-item'>
        <Typography>Choose a Drummer: </Typography>
        <Select 
          value={members.drums.username}
          onChange={(e) => setMembers({...members, drums: {username: e.target.value, id: getIdFromUsername(e.target.value)}})}
          className='select-flexbox-bar'
        >
          {roleLists.drums.map(item => (
            <MenuItem value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </div>
        <div className='select-flexbox-item'>
        <Typography>Choose a Guitarist: </Typography>
        <Select 
          value={members.guitar.username}
          onChange={(e) => setMembers({...members, guitar: {username: e.target.value, id: getIdFromUsername(e.target.value)}})}
          className='select-flexbox-bar'
        >
          {roleLists.guitar.map(item => (
            <MenuItem value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </div>
        <div className='select-flexbox-item'>
        <Typography>Choose a Keyboardist: </Typography>
        <Select 
          value={members.keyboards.username}
          onChange={(e) => setMembers({...members, keyboards: {username: e.target.value, id: getIdFromUsername(e.target.value)}})}
          className='select-flexbox-bar'
        >
          {roleLists.keyboards.map(item => (
            <MenuItem value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </div>
        <div className='select-flexbox-item'>
        <Typography>Choose a Vocalist: </Typography>
        <Select 
          value={members.vocals.username}
          onChange={(e) => setMembers({...members, vocals: {username: e.target.value, id: getIdFromUsername(e.target.value)}})}
          className='select-flexbox-bar'
        >
          {roleLists.vocals.map(item => (
            <MenuItem value={item.username}>{item.username}</MenuItem>
          ))}
        </Select>
        </div>
      </div>
      <Card
        style={{
          marginTop: '5vh',
          padding: '2vh',
          width: '75%',
          marginLeft: '12.5%',
        }}
      >
        <Typography>Bass: {members.bass.username}</Typography>
        <Typography>Drums: {members.drums.username}</Typography>
        <Typography>Guitar: {members.guitar.username}</Typography>
        <Typography>Keyboards: {members.keyboards.username}</Typography>
        <Typography>Vocals: {members.vocals.username}</Typography>
      </Card>
      {
      allowCreate ? 
        <Button onClick={() => createNewProject()}>Create</Button>
      : null
      }
    </div>
  )
}

export default NewProjectPage