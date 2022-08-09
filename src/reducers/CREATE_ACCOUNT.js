export default async function CREATE_ACCOUNT(user, usersRef) {

  await usersRef.doc(user.uid).set({
    name: user.displayName,
    username: user.uid,
    email: user.email,
    completedProjectIds: [],
    currentProjectIds: [],
    friends: [],
    instruments: [],
    receivedFriendRequests: [],
    sentFriendRequests: [],
  })
} 