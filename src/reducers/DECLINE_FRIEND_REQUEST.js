export default async function DECLINE_FRIEND_REQUEST(userData, userRef, uid, otherRef, id) {

  // remove id from user's receivedFriendRequests

  userData.receivedFriendRequests = userData.receivedFriendRequests.filter(item => item !== id);
  await userRef.set({
    ...userData,
  });
  
  // remove uid from other's sentFriendRequests

  let otherData;
  await otherRef.get().then(doc => {
    otherData = doc.data();
  });

  otherData.sentFriendRequests = otherData.sentFriendRequests.filter(item => item !== uid);

  await otherRef.set({
    ...otherData,
  })
}