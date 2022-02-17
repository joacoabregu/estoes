import React from 'react';
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav"
import AddProject from './screens/AddProject';
import Projects from './screens/Projects';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/add-project" element={<AddProject />} />
      </Routes>
    </div>
  );
}

export default App;
