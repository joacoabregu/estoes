/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import AddProject from "./screens/AddProject";
import Projects from "./screens/Projects";
import EditProject from "./screens/EditProject";
import { ProjectsContext } from "./context/ProjectsContext";
import { Projects as ProjectsType } from "./types/interfaces";
import { projectsMock } from "./assets/mockData";

function App() {
  const [projects, setProjects] = React.useState<ProjectsType>(projectsMock);

  return (
    <div css={styles.main}>
      <Nav />
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
        </Routes>
      </ProjectsContext.Provider>
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
