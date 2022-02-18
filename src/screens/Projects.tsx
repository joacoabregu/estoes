/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import ProjectCard from "../components/ProjectCard";
import TextField from "@mui/material/TextField";

import { useProjectsContext } from "../context/ProjectsContext";
import { Projects as ProjectsType } from "../types/interfaces";

export default function Projects() {
  const { projects } = useProjectsContext();
  const [search, setSearch] = React.useState<string>("");
  const [filteredProjects, setFilteredProjects] = React.useState<ProjectsType>(
    []
  );
  const [currentProjects, setCurrentProjects] = React.useState<ProjectsType>(
    []
  );
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const projectsPerPage = 4;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const paginationCount = Math.ceil(projects.length / projectsPerPage);

  let navigate = useNavigate();
  function redirectAddProject(): void {
    navigate("/add-project");
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  React.useEffect(() => {
    setCurrentProjects(projects.slice(indexOfFirstProject, indexOfLastProject));
  }, [projects, indexOfLastProject, indexOfFirstProject]);

  React.useEffect(() => {
    const filteredProjects = projects.filter((project) => {
      return project.name.includes(search);
    });
    setFilteredProjects(filteredProjects);
  }, [projects, search]);

  React.useEffect(() => {
    setCurrentProjects(
      filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
    );
  }, [filteredProjects, indexOfLastProject, indexOfFirstProject]);

  return (
    <Container maxWidth="md">
      <section css={styles.header}>
        <Typography variant="body1" sx={styles.title}>
          My projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={styles.button}
          onClick={redirectAddProject}
        >
          Add project
        </Button>
      </section>
      <Paper variant="outlined">
        <main>
          <TextField
            id="search"
            variant="outlined"
            placeholder="Search..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            inputProps={{ "aria-label": "Without label" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {currentProjects
            .filter((project) => {
              return project.name.includes(search);
            })
            .map((project) => {
              return <ProjectCard key={project.id} project={project} />;
            })}
        </main>
        <Pagination
          count={paginationCount}
          page={currentPage}
          onChange={handleChange}
        />
      </Paper>
    </Container>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2em",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#F5222D",
  },
};
