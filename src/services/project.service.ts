import axios from 'axios';
import { Config } from '../config/config';

let config: Config = require('../config/config.json');

let base_url = config.github_url;

let headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
}

export const getProjects = async (sender_id: string) => {
    
}

export const getProjectByProjectPath = async (project_path: string) => {
    let url = base_url.concat('repos/').concat(project_path);
    let result = await axios.get(url, { headers: headers });
    return result.data
}