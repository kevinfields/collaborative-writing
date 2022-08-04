export default async function REMOVE_FRIEND(userData, userRef, uid, otherRef, id) {

  userData.friends = userData.friends.filter(item => id !== item);
  await userRef.set({
    ...userData,
  });

  let otherData;
  await otherRef.get().then(doc => {
    otherData = doc.data();
  });

  otherData.friends = otherData.friends.filter(item => uid !== item);
  await otherRef.doc(id).set({
    ...otherData,
  });

}