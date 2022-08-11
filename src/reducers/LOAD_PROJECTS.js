export default async function LOAD_PROJECTS(userRef, currentProjectsRef) {


  let projectList = [];
  let username;

  await userRef.get().then(doc => {
    projectList = doc.data().currentProjectIds;
    username = doc.data().username;
  });


  let projectObjects = [];
  for (const id of projectList) {
    await currentProjectsRef.doc(id).get().then(doc => {
      projectObjects.push({
        id: doc.id,
        data: doc.data(),
      })
    })
  };

    return {
      username: username,
      projects: projectObjects,
    };
}