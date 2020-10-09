import * as projectService from "../services/project.service";
import * as projectModel from "../models/project.model";
import Project from "../beans/project";

export const getProjects = async () => {
  return projectService.getProjects();
};

export const getProjectByName = async (projectName: string) => {
  try {
    const project: Project = await projectModel.getByProjectName(projectName);
    let result;

    if (project) {
      const data = await projectService.getProjectByProjectPath(project);
      const visit = project.user_visit;
      result = {
        visit,
        data,
      };
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getIssuesByProjectByName = async (projectName: string) => {
  try {
    const project: Project = await projectModel.getByProjectName(projectName);
    let result;

    if (project) {
      const data = await projectService.getIssuesByProjectPath(project);
      result = {
        data,
      };
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (id: number) => {
  try {
    const project: Project = await projectModel.getById(id);
    const data = await projectService.getProjectByProjectPath(project);
    const result = {
      visit: project.user_visit,
      data,
    };
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const startProject = async () => {
  // console.log("startProject called2");
  return projectService.startProject();
  // const projects = await getProjects();
  /* projects.array.forEach(element => {
    console.log("[Project name: ", element.project_name, "][open_issues_count: ", element.open_issues_count, "]");
  }); */
};

export default { getProjects, getProjectByName, startProject };
