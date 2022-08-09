import { Button, Card, MenuItem, Select, Typography } from '@mui/material';
import React, {useEffect, useState} from 'react';
import CREATE_PROJECT from '../reducers/CREATE_PROJECT';



const NewProjectPage = (props) => {

  const [members, setMembers] = useState({
    bass: '',
    drums: '',
    guitar: '',
    keyboards: '',
    vocals: '',
  });

  const [allFriends, setAllFriends] = useState([]);

  const [roleLists, setRoleLists] = useState({
    bass: [],
    drums: [],
    guitar: [],
    keyboards: [],
    vocals: [],
  });

  const [allowCreate, setAllowCreate] = useState(false);


  const loadAllFriends = async () => {

    let friendList = [];
    let friendObjects = [];
    await props.userRef.get().then(doc => {
      friendList = doc.data().friends;
    })

    for (const user of friendList) {
      await props.usersRef.doc(user).get().then(doc => {
        friendObjects.push({
          id: user,
          data:  doc.data(),
        });
      });
    }

    setAllFriends([...friendObjects]);
    return true;
  };

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


  const createNewProject = async () => {

    let teamIds = [];
    let order = [];

    for (const instrument in members) {
      if (!teamIds.includes(members[instrument])) {
        teamIds.push(members[instrument]);
      }
    };

    console.log(teamIds);
    if (teamIds.length > 5) {
      order = teamIds;
    } else {
      order = teamIds.concat(teamIds).concat(teamIds).slice(0, 6);
    }


    const projectObject = {

      data: {
        bass: members.bass,
        drums: members.drums,
        guitar: members.guitar,
        keyboards: members.keyboards,
        vocals: members.vocals,
        teamIds: teamIds,
        order: order,
        currentRound: 0,
      },
      id: 'test_project_1'
    };


    let userRefs = [];

    for (const user of teamIds) {
      userRefs.push(props.usersRef.doc(user));
    }

    await CREATE_PROJECT(projectObject, props.currentProjectsRef, userRefs);
  }

  return (
    <div className='page'>
      <Button onClick={() => props.goBack()}>Go Back</Button>
      <Card
        style={{
          marginBottom: '5vh',
        }}
      >
        {allFriends.map(item => (
          <Typography>{item.id}</Typography>
        ))}
      </Card>
      <div className='select-flexbox'>
        <Typography>Choose a Bassist: </Typography>
        <Select 
          value={members.bass}
          onChange={(e) => setMembers({...members, bass: e.target.value})}
        >
          {roleLists.bass.map(item => (
            <MenuItem value={item.id}>{item.username}</MenuItem>
          ))}
        </Select>
        <Typography>Choose a Drummer: </Typography>
        <Select 
          value={members.drums}
          onChange={(e) => setMembers({...members, drums: e.target.value})}
        >
          {roleLists.drums.map(item => (
            <MenuItem value={item.id}>{item.username}</MenuItem>
          ))}
        </Select>
        <Typography>Choose a Guitarist: </Typography>
        <Select 
          value={members.guitar}
          onChange={(e) => setMembers({...members, guitar: e.target.value})}
        >
          {roleLists.guitar.map(item => (
            <MenuItem value={item.id}>{item.username}</MenuItem>
          ))}
        </Select>
        <Typography>Choose a Keyboardist: </Typography>
        <Select 
          value={members.keyboards}
          onChange={(e) => setMembers({...members, keyboards: e.target.value})}
        >
          {roleLists.keyboards.map(item => (
            <MenuItem value={item.id}>{item.username}</MenuItem>
          ))}
        </Select>
        <Typography>Choose a Vocalist: </Typography>
        <Select 
          value={members.vocals}
          onChange={(e) => setMembers({...members, vocals: e.target.value})}
        >
          {roleLists.vocals.map(item => (
            <MenuItem value={item.id}>{item.username}</MenuItem>
          ))}
        </Select>
      </div>
      <Card
        style={{
          marginTop: '5vh',
        }}
      >
        <Typography>Bass: {members.bass}</Typography>
        <Typography>Drums: {members.drums}</Typography>
        <Typography>Guitar: {members.guitar}</Typography>
        <Typography>Keyboards: {members.keyboards}</Typography>
        <Typography>Vocals: {members.vocals}</Typography>
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