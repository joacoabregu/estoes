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
import { ProjectsReducerState } from "../types/interfaces";
import { projectsReducer } from "../reducers/ProjectsReducer";

export default function Projects() {
  const { projects } = useProjectsContext();

  const initialState: ProjectsReducerState = {
    projects,
    search: "",
    filteredProjects: [],
    currentProjects: [],
    projectsPerPage: 4,
    indexOfLastProject: 1 * 4,
    indexOfFirstProject: 4 - 4,
    paginationCount: Math.ceil(projects.length / 4),
    currentPage: 1,
  };

  const [state, dispatch] = React.useReducer(projectsReducer, initialState);
  const {
    search,
    filteredProjects,
    paginationCount,
    currentProjects,
    currentPage,
    indexOfLastProject,
    indexOfFirstProject,
  } = state;

  let navigate = useNavigate();
  function redirectAddProject(): void {
    navigate("/add-project");
  }

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch({ type: "CURRENTPAGE", payload: value });
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => dispatch({ type: "SEARCH", payload: event.target.value });

  React.useEffect(() => {
    dispatch({ type: "PROJECTS", payload: projects });
    dispatch({ type: "CURRENTPROJECTS" });
  }, [projects, indexOfLastProject, indexOfFirstProject]);

  React.useEffect(() => {
    dispatch({ type: "SEARCH", payload: search });
  }, [projects, search]);

  React.useEffect(() => {
    dispatch({ type: "CURRENTPROJECTS" });
    dispatch({ type: "PAGINATIONCOUNT" });
  }, [filteredProjects, indexOfLastProject, indexOfFirstProject]);

  return (
    <>
      <section css={styles.header}>
        <Container maxWidth="md" sx={styles.headerContainer}>
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
        </Container>
      </section>

      <Container maxWidth="md" sx={styles.container}>
        <Paper variant="outlined">
          <main>
            <TextField
              id="search"
              variant="outlined"
              placeholder="Search..."
              value={search}
              sx={styles.search}
              onChange={handleSearchChange}
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
            onChange={handlePaginationChange}
            size="large"
            sx={styles.pagination}
          />
        </Paper>
      </Container>
    </>
  );
}

const styles = {
  container: {
    padding: "0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5em",
    marginBottom: "1em",
    backgroundColor: "#FFF",
    borderRadius: "0.25em",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#F5222D",
  },
  search: {
    display: "flex",
    padding: "1em 2em ",
  },
  pagination: {
    padding: "1em",
    "& > ul": {
      justifyContent: "center",
    },
  },
};
