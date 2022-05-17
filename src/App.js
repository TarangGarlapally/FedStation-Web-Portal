import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Console from './components/Console/Console';
import Home from './components/Home/Home';
import Docs from "./components/Docs/Docs.js";
import NewProject from './components/NewProject/NewProject';
import ProjectHomePage from './components/ProjectHomePage/ProjectHomePage';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/navbar/NavBar';
import UserAnalytics from './components/ProjectHomePage/UserAnalytics';
import React from 'react';
import ProjectSettings from './components/ProjectHomePage/ProjectSettings';
import KeySettings from './components/ProjectHomePage/KeySettings';
import ModelSettings from './components/ProjectHomePage/ModelSettings';
import Market from './components/Market/Market';

import GlobalModelAnalytics from './components/ProjectHomePage/GlobalModelAnalytics';
// import Watchdemo from './components/watch-demo/Watchdemo';

function App() {
  // const { currentUser } = useAuth();
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>

          <Route exact path="/home" element={<Home />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/docs" element={<Docs />} />
          <Route path="/console" element={
            <PrivateRoute>
              <Console />
            </PrivateRoute>
          } 
          />
          {/* <Route exact path="/watch-demo" element={
            <Watchdemo />
          }
          /> */}
          <Route path="/newproject" element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          }
          />
          <Route path="/projecthome/:id" element={
            <PrivateRoute>
              <ProjectHomePage />
            </PrivateRoute>
          }
          >
            <Route exact path="" element={<Navigate to={"userAnalytics"} />} />
            <Route
              path="userAnalytics"
              element={<UserAnalytics />}
            >
            </Route>
            <Route
              path="globalModelAnalytics"
              element={<GlobalModelAnalytics />}
            >
            </Route>

            <Route path="projectSettings" element={<ProjectSettings />}></Route>
            <Route path="keySettings" element={<KeySettings />}></Route>
            <Route path="modelSettings" element={<ModelSettings />}></Route>
          </Route>
          <Route path="*" element={localStorage.getItem("token") ? (<Navigate to={"/console"} />) : (<Navigate to={"/home"} />)} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
