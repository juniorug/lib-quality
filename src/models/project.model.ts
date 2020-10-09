import { Project } from "../beans/project";
import { getData, getProjectByName, getProjectByID, updateProject } from "../utils/dbconnection";

export const save = async (project: Project) => {
  return save(project);
};

export const getById = async (id: number) => {
  return getProjectByID(id);
};

export const getByProjectName = async (name: string) => {
  return getProjectByName(name);
};

export const getAll = async () => {
  return getData();
};

export const update = async (project: Project) => {
  return updateProject(project);
};

export default {
  getById,
  save,
  getByProjectName,
  getAll,
  update,
};
