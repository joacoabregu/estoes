/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { FormInput, Project } from "../types/interfaces";
import { useProjectsContext } from "../context/ProjectsContext";
import Form from "../components/Form";


export default function EditProject() {
  const { projects, setProjects } = useProjectsContext();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = React.useState<Project>();
  let navigate = useNavigate();
  function redirectHome(): void {
    navigate("/");
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (project && id) {
      const index = projects.findIndex((element) => {
        return element.id === parseInt(id);
      });
      let projectsCopy = [...projects];
      const newProject: Project = {
        ...project,
        ...data,
      };
      projectsCopy.splice(index, 1, newProject);
      setProjects(projectsCopy);
      redirectHome();
    }
  };

  React.useEffect(() => {
    const project = projects.find((element) => {
      if (id) {
        return element.id === parseInt(id);
      } else {
        return null;
      }
    });
    setProject(project);
  }, [id, projects]);

  if (!project) {
    return (
      <Container maxWidth="sm" sx={styles.container}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <section css={styles.header}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={redirectHome}
          sx={styles.buttonNavigate}
        >
          Back
        </Button>
        <Typography sx={styles.title}>Edit Project</Typography>
      </section>
      <Form onSubmit={onSubmit} project={project} type="edit" />
    </>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0.5em",
    marginBottom: "1em",
    backgroundColor: "#FFF",
  },
  cardHeader: {
    paddingBottom: "0",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  buttonNavigate: {
    border: "none",
    color: "rgba(0, 0, 0, 0.65)",
    marginRight: "1em",
    "&:hover,&:focus": {
      color: "rgba(0, 0, 0, 1)",
      border: "none",
      backgroundColor: "#FFF",
    },
  },
  container: {
    padding: "0",
  },
  
};
