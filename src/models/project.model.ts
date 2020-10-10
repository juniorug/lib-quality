import Project from "../beans/project";
import { save, getData, getProjectByName, getProjectByID, updateProject } from "../utils/dbconnection";

export const saveProject = async (project: Project): Promise<void> => {
  return save(project);
};

export const getById = async (id: number): Promise<Project[]> => {
  return getProjectByID(id);
};

export const getByProjectName = async (name: string): Promise<Project[]> => {
  return getProjectByName(name);
};

export const getAll = async (): Promise<Project[]> => {
  return getData();
};

export const update = async (project: Project): Promise<Project> => {
  return updateProject(project);
};

export default {
  getById,
  save,
  getByProjectName,
  getAll,
  update,
};
