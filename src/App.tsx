/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import AddProject from "./screens/AddProject";
import Projects from "./screens/Projects";

import { ProjectsContext } from "./context/ProjectsContext";
import { Project, Projects as ProjectsType } from "./types/interfaces";
const project: Project = {
  id: 1,
  name: "Prueba",
  description: "lorem ipsum",
  projectManager: "Walt",
  assigned: "Ignacio",
  status: "enabled",
  creationDate: "09/09/09 18:00 am",
  image: "https://picsum.photos/200",
};

function App() {
  const [projects, setProjects] = React.useState<ProjectsType>([project]);

  return (
    <div css={styles.main}>
      <Nav />
      <ProjectsContext.Provider value={{ projects, setProjects }}>
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
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
