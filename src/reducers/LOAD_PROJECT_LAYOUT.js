export default async function LOAD_PROJECT_LAYOUT(projectRef) {

  const layoutObject = {
    bass: [],
    drums: [],
    guitar: [],
    keyboards: [],
    vocals: [],
  }

  for (const instrument in layoutObject) {
    await projectRef.collection(instrument).get().then(snap => {
      snap.forEach(doc => {
        layoutObject[instrument].push(doc.data());
      })
    })
  };

  return layoutObject;
}