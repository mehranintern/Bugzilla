import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Manager from "./Components/Pages/Manager";
import Developer from "./Components/Pages/Developer";
import QA from "./Components/Pages/QA";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Manager" element={<Manager />} />
        <Route path="/Developer" element={<Developer />} />
        <Route path="/QA" element={<QA />} />
      </Routes>
    </Router>
  );
}

export default App;
