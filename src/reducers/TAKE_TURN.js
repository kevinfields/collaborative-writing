import checkTurn from "../functions/checkTurn";

export default async function TAKE_TURN(projectRef, username) {

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

  let nextIndex;
  
  if (project.data.order[project.data.order.length - 1] === username) {
    nextIndex = 0;
  } else {
    nextIndex = project.data.order.indexOf(username) + 1;
  };

  const projectData = {
    ...project.data,
    turnOf: project.data.order[nextIndex],
  };

  await projectRef.set(projectData);

  return true;

}