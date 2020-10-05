import { Project } from "../beans/project";
import {getData, getProjectByName, getProjectByID}  from "../utils/dbconnection";

export const save = async (project: Project) => {
    return await save(project);
}

export const getById = async (id: number) => {
    return await getProjectByID(id);
}

export const getByProjectName = async (name: string) => {
    return await getProjectByName(name);
}

export const getAll = async () => {
    return await getData();
}

export default {
    getById,
    save,
    getByProjectName,
    getAll
}