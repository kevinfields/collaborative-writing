export default async function ACCEPT_FRIEND_REQUEST(userData, userRef, uid, otherRef, id) {

  // remove id from user's receivedFriendRequests / add id to user's friends

  userData.receivedFriendRequests = userData.receivedFriendRequests.filter(item => item !== id);
  userData.friends.push(id);

  await userRef.set({
    ...userData,
  });

  // remove uid from other's sentFriendRequests / add uid to other's friends

  let otherData;

  await otherRef.get().then(doc => {
    otherData = doc.data();
  });

  otherData.sentFriendRequests = otherData.sentFriendRequests.filter(item => item !== uid);
  otherData.friends.push(uid);

  await otherRef.set({
    ...otherData,
  })
}