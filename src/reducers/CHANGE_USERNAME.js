export default async function CHANGE_USERNAME(userRef, takenNamesRef, newName) {


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

  return true;

}