import axios from 'axios';
import { Project } from '../beans/project';
import { Config } from '../config/config';

let config: Config = require('../config/config.json');

let base_url = config.github_url;

let headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
}

export const getProjects = async (sender_id: string) => {
    
}

export const getProjectByProjectPath = async (project: Project) => {

    let projectPath = project.company_name.concat('/', project.project_name);
    let url = base_url.concat('repos/').concat(projectPath);
    let result = await axios.get(url, { headers: headers });
    return result.data
}