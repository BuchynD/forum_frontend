import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { RubricPage } from "./components/RubricPage";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { RubricForm } from "./components/RubricForm";

function App() {
  const navElements = ["Rubric", "User", "Topic", "Message", "BadWord"];
  return (
    <div className="App">
      <Router>
        <nav>
          {navElements.map((el) => (
            <Link to={`/${el.toLowerCase()}`}>{el} </Link>
          ))}
        </nav>
        <Routes>
          <Route path="/rubric" element={<RubricPage />} />
          <Route path="/rubricform" element={<RubricForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
