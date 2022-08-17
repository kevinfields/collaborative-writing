export default async function GET_FRIEND_ACTIONS(userRef, otherUserRef) {

  let userData;

  await userRef.get().then(doc => {
    userData = {
      data: doc.data(),
      id: doc.id,
    };
  });

  let otherUserData;

  await otherUserRef.get().then(doc => {
    otherUserData = {
      data: doc.data(),
      id: doc.id,
    }
  });

  // if user and otherUser are friends, return the option to unfriend

  if (userData.data.friends.includes(otherUserData.id)) {
    return ('remove');
  };

  // if user has a friend request from otherUser, return the options to accept or deny it

  if (userData.data.receivedFriendRequests.includes(otherUserData.id)) {
    return ('accept or deny');
  };

  // if user has sent a friend request to otherUser with no response, return option to retract it

  if (userData.data.sentFriendRequests.includes(otherUserData.id)) {
    return ('retract');
  };

  // if user has not sent or received a request from otherUser and they are not friends, 
  // return option to add friend
  return ('add');
}