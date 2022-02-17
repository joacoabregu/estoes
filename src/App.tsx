/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import AddProject from "./screens/AddProject";
import Projects from "./screens/Projects";

function App() {
  return (
    <div css={styles.main}>
      <Nav />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/add-project" element={<AddProject />} />
      </Routes>
    </div>
  );
}
const styles = {
  main: {
    backgroundColor: "#E5E5E5",
    minHeight: "100vh",
  },
};
export default App;
