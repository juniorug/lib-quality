import * as projectService from '../services/project.service'
import * as projectModel from "../models/project.model";
import { Project } from '../beans/project';

export let getProjects = async () => {
    try {
        let projects: Project[] = await projectModel.getAll();
        let githubData: any = [];

        const promises = projects.map(async (project) => {
            let githubProjectData = await projectService.getProjectByProjectPath(project)
            githubData.push(githubProjectData);
        });

        await Promise.all(promises);
        return githubData;
    } catch (error) {
        console.log(error);
    }
}

export let getProjectByName = async (project_name: string) => {
    try {
        let project: Project = await projectModel.getByProjectName(project_name);
        let result;
        
        if (project) {
            let data = await projectService.getProjectByProjectPath(project);
            let visit = project.user_visit; 
            result = {
                "visit": visit,
                "data": data
            }
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

export let getIssuesByProjectByName = async (project_name: string) => {
    try {
        let project: Project = await projectModel.getByProjectName(project_name);
        let result;
        
        if (project) {
            let data = await projectService.getIssuesByProjectPath(project);
            let visit = project.user_visit; 
            result = {
                "count": data.length,
                "data": data
            }
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

export let getProjectById = async (id: number) => {
    try {
        let project: Project = await projectModel.getById(id);
        let data = await projectService.getProjectByProjectPath(project)  
        let result = {
            visit: project.user_visit,
            "data": data
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default { getProjects, getProjectByName}