/* THINGS THAT SHOULD CHANGE

  - name in user object
  - name in all projects
  - name in all projects order lists
  - name in all projects instruments assignments
  - name in all projects with user as creator in creatorName

*/

export default async function CHANGE_USERNAME(userRef, takenNamesRef, newName, projectsRef) {


  let nameList = [];
  await takenNamesRef.get().then(doc => {
    nameList = [...doc.data().names];
  })


  if (nameList.includes(newName)) {
    return false;
  }

  let data;
  await userRef.get().then(doc => {
    data = doc.data();
  });

  const oldName = data.username;

  nameList.push(newName);
  nameList = nameList.filter(item => item !== oldName);

  await takenNamesRef.set({
    names: nameList,
  });

  await userRef.set({
    ...data,
    username: newName,
  });

  const projectIds = [...data.currentProjectIds];

  for (const project of projectIds) {

    let data;
    await projectsRef.doc(project).get().then(doc => {
      data = doc.data();
    });

    for (const property in data) {

      if (property === 'title') {
        continue;
      }
      if (data[property] === oldName) {
        data[property] = newName
      };
    };

    let orderIndex = data.order.indexOf(oldName);
    data.order[orderIndex] = newName;
    await projectsRef.doc(project).set(data);
  }

  return true;

}