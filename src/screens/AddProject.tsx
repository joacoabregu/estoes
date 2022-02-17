/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { format } from "date-fns";

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
import { FormInput, Project } from "../types/interfaces";

import { useProjectsContext } from "../context/ProjectsContext";

export default function AddProject() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<FormInput>();
  const { projects, setProjects } = useProjectsContext();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const lastProjectId: number = projects[projects.length - 1].id;
    const newProject: Project = {
      ...data,
      id: lastProjectId + 1,
      creationDate: format(new Date(), "dd/MM/y hh:mm aaaa"),
      image: "https://picsum.photos/200",
    };
    setProjects([...projects, newProject]);
  };
  let navigate = useNavigate();
  function redirectHome(): void {
    navigate("/");
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
        <Typography sx={styles.title}>Add Project</Typography>
      </section>
      <Container maxWidth="sm" sx={styles.formContainer}>
        <Paper elevation={4} sx={styles.formPaper}>
          <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
            <InputLabel htmlFor="name">Project name</InputLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="name"
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                  {...field}
                />
              )}
            />

            <InputLabel htmlFor="description">Description</InputLabel>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="description"
                  variant="outlined"
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                  {...field}
                />
              )}
            />

            <InputLabel id="manager">Project Manager</InputLabel>
            <Controller
              name="projectManager"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    labelId="manager-select-label"
                    id="manager"
                    inputProps={{ "aria-label": "Without label" }}
                    {...field}
                    displayEmpty={true}
                    renderValue={(value) =>
                      value?.length
                        ? Array.isArray(value)
                          ? value.join(", ")
                          : value
                        : "Select a person"
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select a person</em>
                    </MenuItem>
                    <MenuItem value="Walt Cosani">Walt Cosani</MenuItem>
                    <MenuItem value="Ignacio Truffa">Ignacio Truffa</MenuItem>
                    <MenuItem value="Walter">Walter</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <InputLabel id="assignedTo">Assigned to</InputLabel>
            <Controller
              name="assignedTo"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    labelId="assignedTo-select-label"
                    id="assignedTo"
                    inputProps={{ "aria-label": "Without label" }}
                    {...field}
                    displayEmpty={true}
                    renderValue={(value) =>
                      value?.length
                        ? Array.isArray(value)
                          ? value.join(", ")
                          : value
                        : "Select a person"
                    }
                  >
                    <MenuItem disabled value="">
                      <em>Select a person</em>
                    </MenuItem>
                    <MenuItem value="Walt Cosani">Walt Cosani</MenuItem>
                    <MenuItem value="Ignacio Truffa">Ignacio Truffa</MenuItem>
                    <MenuItem value="Walter">Walter</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <InputLabel id="status">Status</InputLabel>
            <Controller
              name="status"
              control={control}
              defaultValue="enabled"
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    labelId="status-select-label"
                    id="status"
                    inputProps={{ "aria-label": "Without label" }}
                    {...field}
                  >
                    <MenuItem value="enabled">Enabled</MenuItem>
                    <MenuItem value="disabled">Disabled</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Button variant="contained" type="submit" sx={styles.buttonSubmit}>
              Add project
            </Button>
          </form>
        </Paper>
      </Container>
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
  buttonSubmit: {
    display: "block",
    backgroundColor: "#F5222D",
    "&:hover,&:focus": {
      backgroundColor: "#ef222d",
    },
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
  formPaper: {
    padding: "2em",
  },
  formContainer: {
    padding: "0",
  },
  form: {
    "& :nth-of-type(even)": {
      marginBottom: "0.5em",
    },
  },
  inputLabel: {
    marbinBottom: "0.5em",
  },
};
