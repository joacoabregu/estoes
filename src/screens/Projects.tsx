/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import {useProjectsContext} from "../context/ProjectsContext"

export default function Projects() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };
  let navigate = useNavigate();
  function redirectAddProject(): void {
    navigate("/add-project");
  }

  const {projects} = useProjectsContext()

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
          {projects.map((project) => {
            return (
              <Card key={project.id}>
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={project.name}
                  subheader={`Creation date: ${project.creationDate}`}
                  sx={styles.cardHeader}
                />
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Edit</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Delete</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Menu>

                <CardContent sx={styles.cardContent}>
                  <img
                    src={project.image}
                    alt="profile"
                    css={styles.profileImg}
                  />
                  <Typography variant="body1" sx={styles.cardContentTypography}>
                    {project.assignedTo}{" "}
                  </Typography>
                </CardContent>
              </Card>
            );
          })

          }
         
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
  cardHeader: {
    paddingBottom: "0",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  profileImg: {
    borderRadius: "50%",
    width: "100",
    maxHeight: "30px",
    marginRight: "0.5em",
  },
  cardContent: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardContentTypography: {
    color: "rgba(0, 0, 0, 0.65)",
  },
  button: {
    backgroundColor: "#F5222D",
  },
};
