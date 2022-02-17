export interface FormInput {
  name: string;
  description: string;
  projectManager: string;
  assignedTo: string;
  status: "enabled" | "disabled";
}

export interface Project {
  id: number;
  name: string;
  description: string;
  projectManager: string;
  assignedTo: string;
  status: string;
  creationDate: string;
  image: string;
}

export type Projects = Project[];

export interface ProjectsContextValue {
  projects: Projects;
  setProjects: React.Dispatch<React.SetStateAction<Projects>>;
}

export interface ProjectCardProps {
  project: Project;
}