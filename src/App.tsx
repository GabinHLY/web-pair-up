
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import NewGame from "./pages/NewGame";
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/new-game" element={<NewGame />} />
      </Routes>
    </Router>
  );
}

export default App;
