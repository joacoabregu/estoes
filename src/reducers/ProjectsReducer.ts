import {
  ProjectsReducerState,
  ProjectsReducerAction,
} from "../types/interfaces";
export const SEARCH = "SEARCH";
export const FILTER = "FILTER";
export const CURRENTPROJECTS = "CURRENTPROJECTS";
export const PAGINATIONCOUNT = "PAGINATIONCOUNT";
export const CURRENTPAGE = "CURRENTPAGE";
const PROJECTS = "PROJECTS";

export function projectsReducer(
  state: ProjectsReducerState,
  action: ProjectsReducerAction
) {
  switch (action.type) {
    case PROJECTS: {
      const projects = action.payload;
      return {
        ...state,
        projects,
      };
    }
    case SEARCH: {
      const filteredProjects = state.projects.filter((project) => {
        return project.name.includes(action.payload);
      });
      return {
        ...state,
        search: action.payload,
        filteredProjects,
      };
    }
    case CURRENTPAGE: {
      const currentPage = action.payload;
      const indexOfLastProject = currentPage * state.projectsPerPage;
      const indexOfFirstProject = indexOfLastProject - state.projectsPerPage;
      return {
        ...state,
        currentPage,
        indexOfLastProject,
        indexOfFirstProject,
      };
    }
    case FILTER: {
      const currentProjects = state.filteredProjects.slice(
        state.indexOfFirstProject,
        state.indexOfLastProject
      );
      const paginationCount = Math.ceil(
        state.filteredProjects.length / state.projectsPerPage
      );
      return {
        ...state,
        currentProjects,
        paginationCount,
      };
    }
    case CURRENTPROJECTS: {
      const currentProjects = state.projects.slice(
        state.indexOfFirstProject,
        state.indexOfLastProject
      );

      return {
        ...state,
        currentProjects,
      };
    }
    case PAGINATIONCOUNT: {
      const paginationCount = Math.ceil(
        state.filteredProjects.length / state.projectsPerPage
      );

      return {
        ...state,
        paginationCount,
      };
    }
  }
}
