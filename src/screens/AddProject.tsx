/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormInput, Project } from "../types/interfaces";
import { useProjectsContext } from "../context/ProjectsContext";
import Form from "../components/Form";

export default function AddProject() {
  const { projects, setProjects } = useProjectsContext();
  let navigate = useNavigate();
  function redirectHome(): void {
    navigate("/");
  }

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const lastProjectId: number = projects[projects.length - 1].id;
    const newProject: Project = {
      ...data,
      id: lastProjectId + 1,
      creationDate: format(new Date(), "dd/MM/y hh:mm aaaa"),
      image: "https://picsum.photos/200",
    };
    setProjects([...projects, newProject]);
    redirectHome();
  };

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
        <Typography sx={styles.title}>Add Project</Typography>
      </section>
      <Form onSubmit={onSubmit} type="add" />
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
};
