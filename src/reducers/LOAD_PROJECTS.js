export default async function LOAD_PROJECTS(userRef, currentProjectsRef) {


  let projectList = [];

  await userRef.get().then(doc => {
    projectList = doc.data().currentProjectIds;
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

  return projectObjects;
}