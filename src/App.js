import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Console from './components/Console/Console';
import Home from './components/Home/Home';
import NewProject from './components/NewProject/NewProject';
import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';



function App() {
  const { currentUser } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      <Router>
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;