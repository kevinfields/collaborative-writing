import checkTurn from "../functions/checkTurn";

export default async function TAKE_TURN(projectRef, turnObject, trackType, username) {

  let project;
  await projectRef.get().then(doc => {
    project = {
      id: doc.id,
      data: doc.data(),
    };
  });

  if (!checkTurn(project.data.currentRound, project.data.order, username)) {
    console.log(project.data.currentRound + " | " + project.data.order + ' | ' + username);
    return false;
  }

  project.data.currentRound++;

  project.data.turnObjects.push()

  let nextIndex;
  
  if (project.data.order[project.data.order.length - 1] === username) {
    nextIndex = 0;
  } else {
    nextIndex = project.data.order.indexOf(username) + 1;
  };

  let projectData = {
    ...project.data,
    turnOf: project.data.order[nextIndex], 
    lastUpdated: new Date(),
  };

  

  let trackId = '';

  switch (trackType) {
    case 'bass': 
      await projectRef.collection('bass').add(turnObject).then((res => {
        trackId = res.id;
      }));
      break;
    case 'guitar':
      await projectRef.collection('guitar').add(turnObject).then((res => {
        trackId = res.id;
      }));
      break;
    case 'keyboards':
      await projectRef.collection('keyboards').add(turnObject).then((res => {
        trackId = res.id;
      }));
      break;
    case 'drums':
      await projectRef.collection('drums').add(turnObject).then((res => {
        trackId = res.id;
      }));
      break;
    case 'vocals':
      await projectRef.collection('vocals').add(turnObject).then((res => {
        trackId = res.id;
      }));
      break;
    default:
      break;
  }


  projectData.turnObjects.push({instrument: trackType, trackId: trackId});
  await projectRef.set(projectData);

  return true;

}