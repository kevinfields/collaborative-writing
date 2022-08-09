import React, {useState, useEffect} from 'react';
import HomePageButtons from "./components/HomePageButtons";
import { Routes, Route, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AllUsersPage from './pages/AllUsersPage';
import CurrentProjectsPage from './pages/CurrentProjectsPage';
import NewProjectPage from './pages/NewProjectPage';


function App() {

  firebase.initializeApp({
    apiKey: "AIzaSyAb111OYldSBOKEivY1WXMfAo6jJD_JSqk",
    authDomain: "collaborative-writing-f8298.firebaseapp.com",
    projectId: "collaborative-writing-f8298",
    storageBucket: "collaborative-writing-f8298.appspot.com",
    messagingSenderId: "307312321238",
    appId: "1:307312321238:web:cf078b93a038f7680bdf77",
  });
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const background = document.getElementsByTagName("html")[0];
  const [user] = useAuthState(auth);
  
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/");
  };

  const openCurrentProjects = async () => {
    setTab(3);
  };

  const createNewProject = async () => {
    setTab(4);
  };

  const openCompletedProjects = async () => {

  };

  const openProfile = async () => {
    setTab(1);
  };

  const openAllUsersPage = async () => {
    setTab(2);
  }

  return (
    <div className="page">
      { !user ?
        <LoginPage
          auth={auth}
          usersRef={firestore.collection("users")}
          onLogin={() => loginUser()}
        />
      : tab === 0 ?
        <HomePageButtons
          createNewProject={() => createNewProject()}
          openCurrentProjects={() => openCurrentProjects()}
          openCompletedProjects={() => openCompletedProjects()}
          openProfile={() => openProfile()}
          openAllUsersPage={() => openAllUsersPage()}
          user={user}
          firestore={firestore}
          userRef={firestore.collection('users').doc(user.uid)}
          completedProjectsRef={firestore.collection('completedProjects')}
          currentProjectsRef={firestore.collection('currentProjects')}
        />
      : tab === 1 ?
        <ProfilePage
          userRef={firestore.collection('users').doc(user.uid)}
          takenNamesRef={firestore.collection('taken_usernames').doc('list')}
          goBack={() => setTab(0)}
        />
      : tab === 2 ?
        <AllUsersPage
          usersRef={firestore.collection('users')}
          uid={user.uid}
          userRef={firestore.collection('users').doc(user.uid)}
          firestore={firestore}
          user={user}
          goBack={() => setTab(0)}
          openProfile={() => setTab(1)}
        />
      : tab === 3 ?
        <CurrentProjectsPage
          userRef={firestore.collection('users').doc(user.uid)}
          currentProjectsRef={firestore.collection('currentProjects')}
          goBack={() => setTab(0)}
        />
      : tab === 4 ?
        <NewProjectPage 
          userRef={firestore.collection('users').doc(user.uid)}
          usersRef={firestore.collection('users')}
          currentProjectsRef={firestore.collection('currentProjects')}
          goBack={() => setTab(0)}
        />
      : null
      }
    </div>
  );
}

export default App;
