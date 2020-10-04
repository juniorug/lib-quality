import { Project } from "../beans/project";
import {getData, incrementCount, getProjectByName, getProjectByID}  from "../utils/dbconnection";

export const save = async (project: Project) => {
   
}

export const getById = async (id: number) => {
    return await getProjectByID(id);
}

export const getByProjectName = async (name: string) => {
    return await getProjectByName(name);
}

export const getAll = async () => {
    console.log("model getAll called");
    return await getData();
}

export const incrementVisit = async (id: number) => {
    return await incrementCount(id);
}
export default {
    getById,
    save,
    getByProjectName,
    getAll,
    incrementVisit
}