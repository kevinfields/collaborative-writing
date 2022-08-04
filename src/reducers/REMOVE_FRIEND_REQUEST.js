export default async function REMOVE_FRIEND_REQUEST(userData, userRef, uid, otherRef, id) {

  // remove users sent request

  userData.sentFriendRequests = userData.sentFriendRequests.filter(item => item !== id);

  await userRef.set({
    ...userData,
  })

  // remove others received request

  let otherData;

  await otherRef.get().then(doc => {
    otherData = doc.data();
  });

  otherData.receivedFriendRequests = otherData.receivedFriendRequests.filter(item => item !== uid);
  await otherRef.set({
    ...otherData,
  })
}