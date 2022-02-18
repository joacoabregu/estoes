import { SubmitHandler } from "react-hook-form";

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
  status: "enabled" | "disabled";
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

export interface ProjectFormProps {
  onSubmit: SubmitHandler<FormInput>;
  project?: Project;
  type: "add" | "edit";
}
