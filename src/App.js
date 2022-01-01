import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Console from './components/Console/Console';
import Home from './components/Home/Home';
import NewProject from './components/NewProject/NewProject';
import ProjectHomePage from './components/ProjectHomePage/ProjectHomePage';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/navbar/NavBar';
import UserAnalytics from './components/ProjectHomePage/UserAnalytics';

import ProjectSettings from './components/ProjectHomePage/ProjectSettings';
import KeySettings from './components/ProjectHomePage/KeySettings';
import ModelSettings from './components/ProjectHomePage/ModelSettings';

import GlobalModelAnalytics from './components/ProjectHomePage/GlobalModelAnalytics';
import LocalModelAnalytics from './components/ProjectHomePage/localModelAnalytics';

function App() {
  // const { currentUser } = useAuth();
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route path="*" element={localStorage.getItem("token") ? (<Navigate to={"/console"} />) : (<Navigate to={"/home"} />)} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/console" element={
            <PrivateRoute>
              <Console />
            </PrivateRoute>
          }
          />
          <Route path="/newproject" element={
            <PrivateRoute>
              <NewProject />
            </PrivateRoute>
          }
          />
          <Route path="/projecthome" element={
            <PrivateRoute>
              <ProjectHomePage />
            </PrivateRoute>
          }
          >
            <Route
              path="userAnalytics"
              element={<UserAnalytics />}
            >
            </Route>
            <Route
              path="localModelAnalytics"
              element={<LocalModelAnalytics />}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
