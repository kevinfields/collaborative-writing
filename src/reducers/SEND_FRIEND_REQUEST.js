export default async function SEND_FRIEND_REQUEST(userData, userRef, uid, otherRef, id) {

  // add id to users sent requests list

  userData.sentFriendRequests.push(id);
  await userRef.set({
    ...userData,
  });

  // add uid to other users received requests list

  let otherData;

  await otherRef.get().then(doc => {
    otherData = doc.data();
  });

  otherData.receivedFriendRequests.push(uid);
  await otherRef.set({
    ...otherData,
  })
}
