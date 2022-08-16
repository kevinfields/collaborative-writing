export default async function CREATE_PROJECT(projectData, currentProjectsRef, userRefs) {

  for (const userRef of userRefs) {
    let data;

    await userRef.get().then(doc => {
      data = doc.data();
    });

    data.currentProjectIds.push(projectData.id);

    await userRef.set({
      ...data,
    });
  }

  const date = new Date();
  await currentProjectsRef.doc(projectData.id).set({
    ...projectData.data,
    turnObjects: [],
    date: date,
    lastUpdated: date,
  });
  
}