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
  assigned: string;
  status: string;
  creationDate: string;
  image: string;
}

export type Projects = Project[];

export interface ProjectsContextValue {
  state: Projects;
  setState: () => {};
}
