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
import SingleProjectPage from './pages/SingleProjectPage';


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
  const [currentId, setCurrentId] = useState('-1');
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/");
  };

  const openCurrentProjects = async () => {
    navigate(`/${user.uid}/current_projects`);
  };

  const createNewProject = async () => {
    navigate('/new_project');
  };

  const openCompletedProjects = async () => {

  };

  const openProfile = async () => {
    navigate(`/${user.uid}/my_profile`);
  };

  const openAllUsersPage = async () => {
    navigate('/all_users');
  }

  useEffect(() => {

    if (currentId !== '-1') {
      navigate(`/${user.uid}/current_projects/${currentId}`)
    }
  }, [currentId]);

  return (
    <div className="page">
      { !user ?
        <LoginPage
          auth={auth}
          usersRef={firestore.collection("users")}
          onLogin={() => loginUser()}
        />
      : 
      <Routes>
        <Route
          exact
          path='/'
          element={
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
          }
        />
        <Route
          path={`/:${user.uid}/my_profile`}
          element={
            <ProfilePage
              userRef={firestore.collection('users').doc(user.uid)}
              takenNamesRef={firestore.collection('taken_usernames').doc('list')}
              goBack={() => navigate('/')}
            />
          }
        />
        <Route
          path={'/all_users'}
          element={
            <AllUsersPage
              usersRef={firestore.collection('users')}
              uid={user.uid}
              userRef={firestore.collection('users').doc(user.uid)}
              firestore={firestore}
              user={user}
              goBack={() => navigate('/')}
              openProfile={() => navigate(`/:${user.uid}/profile`)}
            />
          }
        />
        <Route
          path={`/:${user.uid}/current_projects`}
          element={
            <CurrentProjectsPage
              userRef={firestore.collection('users').doc(user.uid)}
              currentProjectsRef={firestore.collection('currentProjects')}
              chooseProject={(id) => navigate(`/${user.uid}/current_projects/${id}`)}
              goBack={() => navigate('/')}
            />
          }
        />
        <Route
          path={'/new_project'}
          element={
            <NewProjectPage 
              userRef={firestore.collection('users').doc(user.uid)}
              uid={user.uid}
              usersRef={firestore.collection('users')}
              currentProjectsRef={firestore.collection('currentProjects')}
              goBack={() => navigate('/')}
            />
          }
        />
        <Route
          path={`/${user.uid}/current_projects/:projectID`}
          element={
            <SingleProjectPage
              userRef={firestore.collection('users').doc(user.uid)}
              uid={user.uid}
              usersRef={firestore.collection('users')}
              currentProjectsRef={firestore.collection('currentProjects')}
              goBack={() => navigate('/')}
            />
          }
        />
      </Routes>
      }
    </div>
  );
}

export default App;
