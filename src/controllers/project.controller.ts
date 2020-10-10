import * as projectService from "../services/project.service";
import * as projectModel from "../models/project.model";
import Project from "../beans/project";

export const getProjects = async (): Promise<Project[]> => {
  return projectService.getProjects();
};

export const getGithubProjects = async () => {
  return projectService.getGithubProjects();
};

export const getProjectByName = async (projectName: string) => {
  try {
    return await projectModel.getByProjectName(projectName);
  } catch (error) {
    console.log(error);
  }
};

export const getGithubProjectByName = async (projectName: string) => {
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
    return await projectModel.getById(id);
  } catch (error) {
    console.log(error);
  }
};

export const startProject = async () => {
  console.log("startProject called");
  return projectService.startProject();
};

export default { getProjects, getProjectByName, startProject };
