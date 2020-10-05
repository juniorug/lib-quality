import axios from 'axios';
import { Project } from '../beans/project';
import { Config } from '../config/config';

let config: Config = require('../config/config.json');

let base_url = config.github_url;

let headers = {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
}

export const getProjectByProjectPath = async (project: Project) => {

    let projectPath = project.company_name.concat('/', project.project_name);
    let url = base_url.concat('repos/').concat(projectPath);
    let result = await axios.get(url, { headers: headers });
    return result.data
}

export const getIssuesByProjectPath = async (project: Project) => {
  
    let itensPerPage = 50;
    let openIssues = 521;
    let currentPage = 1;
    let totalPages = Math.ceil(openIssues / itensPerPage);
    let result = {
        data: []
    }

    while(currentPage <= totalPages) {
        let issuesPath = project.company_name.concat('/', project.project_name, `/issues?page=${currentPage}&per_page=${itensPerPage}`);
        let url = base_url.concat('repos/').concat(issuesPath);
        console.log("caliing issues, url: ", url);
        let partial = await axios.get(url, { headers: headers });
        result.data = result.data.concat(partial.data);
        currentPage ++;
    }
    return result.data
}