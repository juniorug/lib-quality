import * as projectService from '../services/project.service'
import { Project } from '../beans/project';
import * as projectModel from "../models/project.model";
import * as _ from "lodash";

export let getProjects = async () => {
    try {
        let projects: Project[] = await projectModel.getAll();
        //let projects = await getData() //data['db']['data']
        //console.log("dataNEW: ", projects);
        let githubData: any = [];

        const promises = projects.map(async (project) => {
            let githubProjectData = await projectService.getProjectByProjectPath(project)
            githubData.push(githubProjectData);
        });
        await Promise.all(promises);
        return githubData;

/*
        projects.forEach( project => {
            console.log("company_name: ", project.company_name); 
            console.log("project_name: ", project.project_name);   
            let githubProjectData = await projectService.getProjectByProjectPath(project)
            githubData.push(githubProjectData);
         });
         */
         

        //let increment  = await incrementCount(1);
        //console.log("increment: ", increment);
        //let project2 = await getDataByProjectName("angular");
        //console.log("project2: ", project2);
        
        
        /*console.log("controller get projects called");
        let projects = await projectModel.getAll();
        console.log("projects: ", projects);   
        projects.forEach( project => {
            console.log("project_name: ", project);   
         });
         return projects;*/
    } catch (error) {
        console.log(error);
    }
}

export let getProjectByName = async (project_name) => {
    try {
        let project: Project = await projectModel.getByProjectName(project_name);
        await projectModel.incrementVisit(project.id);
        return await projectService.getProjectByProjectPath(project);
    } catch (error) {
        console.log(error);
    }
}

export default { getProjects, getProjectByName}