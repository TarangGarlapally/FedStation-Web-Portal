import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Console from './components/Console/Console';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route exact path="/console" element={<Console />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
