import axios from "axios";
import { Issue } from "../beans/issue";
import Project from "../beans/project";
import * as projectModel from "../models/project.model";
import * as config from "../config/config.json";

const baseUrl = config.github_url;

const headers = {
  Accept: "application/vnd.github.v3+json",
  "Content-Type": "application/json",
  Authorization: "b856ffc3fe75466738ccfb1c58997db9191502e1",
};

function filterByName(nameToCompare: string) {
  return function(project) {
    return project.full_name === nameToCompare;
  };
}

export const getProjectByProjectPath = async (project: Project): Promise<Project> => {
  const url = baseUrl.concat("repos/").concat(project.full_name);
  const result = await axios.get(url, { headers });
  return result.data;
};

export const getProjects = async () => {
  return projectModel.getAll();
};

export const getGithubProjects = async () => {
  try {
    const projects: Project[] = await projectModel.getAll();
    const githubData: any = [];

    const promises = projects.map(async project => {
      const githubProjectData = await getProjectByProjectPath(project);
      githubData.push(githubProjectData);
    });

    await Promise.all(promises);
    return githubData;
  } catch (error) {
    console.log(error);
  }
};

export const getIssuesByProjectPath = async (project: Project) => {
  console.log("XXX getIssuesByProjectPath called");

  const itensPerPage = 50;
  const totalPages = Math.ceil(project.open_issues_count / itensPerPage);
  const result = {
    data: [],
  };
  const urls: string[] = [];
  for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
    urls.push(baseUrl.concat("repos/", project.full_name, `/issues?page=${currentPage}&per_page=${itensPerPage}`));
  }

  const promiseIssues = urls.map(async url => {
    console.log("caliing issues, url: ", url);
    const partial = await axios.get(url, { headers });
    result.data = result.data.concat(
      partial.data
        .filter((issue: Issue) => issue.state === "open")
        .map(function getOpenDays(item: any) {
          const diffInTime = Math.abs(new Date().getTime() - new Date(item.created_at).getTime());
          const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
          return diffInDays;
        }),
    );
  });

  await Promise.all(promiseIssues);
  return result.data.reduce(function average(avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
};

export const startProject = async () => {
  /* getallProjects
  // add opened issues to a variable
  // call getIssuesByProjectPath to get the average of days from opened issues
  // save avg and opened issues to DB
  */
  try {
    const projects: Project[] = await projectModel.getAll();
    const githubData: any = [];

    const promises = projects.map(async project => {
      githubData.push(await getProjectByProjectPath(project));
    });

    await Promise.all(promises);

    const promiseIssues = projects.map(async project => {
      const githubProject = githubData.filter(filterByName(project.full_name));
      if (githubProject.length) {
        // project.id = githubProject[0].id;
        project.open_issues_count = githubProject[0].open_issues_count;
        project.avg_opened_issues = await getIssuesByProjectPath(project);
        projectModel.update(project);
      }
    });
    await Promise.all(promiseIssues);
    return projects;
  } catch (error) {
    console.log(error);
  }
};
