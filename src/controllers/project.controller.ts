import * as projectService from "../services/project.service";
import * as projectModel from "../models/project.model";
import Project from "../beans/project";

export const getProjects = async () => {
  try {
    const projects: Project[] = await projectModel.getAll();
    const githubData: any = [];

    const promises = projects.map(async project => {
      const githubProjectData = await projectService.getProjectByProjectPath(project);
      githubData.push(githubProjectData);
    });

    await Promise.all(promises);
    return githubData;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectByName = async (project_name: string) => {
  try {
    const project: Project = await projectModel.getByProjectName(project_name);
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

export const startProject = async (): Promise<void> => {
  console.log("startProject called2");
};

export default { getProjects, getProjectByName, startProject };
