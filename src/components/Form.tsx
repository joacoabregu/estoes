/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import { FormInput, ProjectFormProps } from "../types/interfaces";

export default function ProjectForm({
  onSubmit,
  project,
  type,
}: ProjectFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const defaultValues = {
    name: project?.name ?? "",
    description: project?.description ?? "",
    projectManager: project?.projectManager ?? "",
    assignedTo: project?.assignedTo ?? "",
    status: project?.status ?? "enabled",
  };

  const buttonText = type === "add" ? "Create project" : "Save changes";

  return (
    <Container maxWidth="sm" sx={styles.formContainer}>
      <Paper elevation={4} sx={styles.formPaper}>
        <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
          <InputLabel htmlFor="name">Project name</InputLabel>
          <Controller
            name="name"
            control={control}
            defaultValue={defaultValues.name}
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
          {errors.name?.type === "required" && (
            <Alert severity="error">Project name is required</Alert>
          )}

          <InputLabel htmlFor="description">Description</InputLabel>
          <Controller
            name="description"
            control={control}
            defaultValue={defaultValues.description}
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
          {errors.description?.type === "required" && (
            <Alert severity="error">Description is required</Alert>
          )}

          <InputLabel id="manager">Project Manager</InputLabel>
          <Controller
            name="projectManager"
            control={control}
            defaultValue={defaultValues.projectManager}
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
          {errors.projectManager?.type === "required" && (
            <Alert severity="error">Project manager is required</Alert>
          )}

          <InputLabel id="assignedTo">Assigned to</InputLabel>
          <Controller
            name="assignedTo"
            control={control}
            defaultValue={defaultValues.assignedTo}
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
          {errors.assignedTo?.type === "required" && (
            <Alert severity="error">Assigned is required</Alert>
          )}

          <InputLabel id="status">Status</InputLabel>
          <Controller
            name="status"
            control={control}
            defaultValue={defaultValues.status}
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
          {errors.status?.type === "required" && (
            <Alert severity="error">Status is required</Alert>
          )}

          <Button variant="contained" type="submit" sx={styles.buttonSubmit}>
            {buttonText}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

const styles = {
  buttonSubmit: {
    display: "block",
    backgroundColor: "#F5222D",
    "&:hover,&:focus": {
      backgroundColor: "#ef222d",
    },
    marginTop: "1em",
  },
  formPaper: {
    padding: "2em",
  },
  formContainer: {
    padding: "0",
  },
  form: {
    "& > *": {
      marginTop: "0.5em",
    },
  },
  inputLabel: {
    marbinBottom: "0.5em",
  },
};
