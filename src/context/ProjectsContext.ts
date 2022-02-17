import * as React from "react";
import { ProjectsContextValue } from "../types/interfaces";

const ProjectsContext = React.createContext<ProjectsContextValue | undefined>(
  undefined
);
ProjectsContext.displayName = "ProjectsContext";

function useProjectsContext() {
  const context = React.useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error(`useProjects must be used within a ProjectsProvider`);
  }
  return context;
}

export { ProjectsContext, useProjectsContext };
