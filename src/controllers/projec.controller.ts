import * as projectService from '../services/project.service'
import { Project } from '../models/project';

export let getProjects = async (req: Request, res: Response) => {
    
}

export let getProjectByName = async (project_name) => {
    try {
        let project = new Project(project_name);
        return await projectService.getProjectByProjectPath(project.getProjectPath());
    } catch (error) {
        console.log(error);
    }
}

export default { getProjects, getProjectByName}