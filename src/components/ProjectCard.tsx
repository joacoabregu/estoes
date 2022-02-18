/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import Typography from "@mui/material/Typography";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ProjectCardProps } from "../types/interfaces";
import { useProjectsContext } from "../context/ProjectsContext";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: ProjectCardProps) {
  const { projects, setProjects } = useProjectsContext();
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleAgreeDialogAction = () => {
    deleteProject();
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function deleteProject(): void {
    const newProjects = projects.filter((element) => {
      return element.id !== project.id;
    });
    setProjects(newProjects);
  }

  function redirectEdit(): void {
    navigate(`/edit-project/${project.id}`);
  }

  return (
    <Card sx={styles.card}>
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
          <MenuItem onClick={redirectEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleOpenDialog}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Project"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Disagree</Button>
          <Button onClick={handleAgreeDialogAction} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent sx={styles.cardContent}>
        <img src={project.image} alt="profile" css={styles.profileImg} />
        <Typography variant="body1" sx={styles.cardContentTypography}>
          {project.assignedTo}{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

const styles = {
  card: {
    borderRadius: "0",
    borderBottom: "1px solid #E5E5E5",
  },
  cardHeader: {
    paddingBottom: "0",
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
};
