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

import { useProjectsContext } from "../context/ProjectsContext";

import ProjectCard from "../components/ProjectCard";
import TextField from "@mui/material/TextField";

export default function Projects() {

  const [search, setSearch] = React.useState<string>("")
  let navigate = useNavigate();
  function redirectAddProject(): void {
    navigate("/add-project");
  }

  const { projects } = useProjectsContext();



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
          {projects.filter((project)=> {
              return project.name.includes(search)
          }).map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </main>
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
