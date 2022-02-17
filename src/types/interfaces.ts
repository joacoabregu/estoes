export interface FormInput {
  name: string;
  description: string;
  projectManager: string;
  assignedTo: string;
  status: "enabled" | "disabled";
}