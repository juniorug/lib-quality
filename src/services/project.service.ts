import axios from "axios";
import { Issue } from "../beans/issue";
import Project from "../beans/project";
import { getData, getProjectByName, getProjectByID } from "../utils/dbconnection";
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
    console.log("CCCCCC project.full_name", project.full_name);
    console.log("CCCCCC nameToCompare", nameToCompare);
    console.log("CCCCCC project.full_name === nameToCompare", project.full_name === nameToCompare);
    return project.full_name === nameToCompare;
  };
}

function filter(arr, criteria) {
  return arr.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c] === criteria[c];
    });
  });
}

export const getProjectByProjectPath = async (project: Project): Promise<Project> => {
  const projectPath = project.company_name.concat("/", project.project_name);
  const url = baseUrl.concat("repos/").concat(projectPath);
  console.log("caliing getProjects, url: ", url);
  const result = await axios.get(url, { headers });
  return result.data;
};

export const getProjects = async () => {
  try {
    const projects: Project[] = await getData();
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
  const itensPerPage = 5; // 50
  const openIssues = 14; // 521
  const totalPages = Math.ceil(openIssues / itensPerPage);
  const result = {
    data: [],
  };

  for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
    const url = baseUrl.concat(
      "repos/",
      project.company_name,
      "/",
      project.project_name,
      `/issues?page=${currentPage}&per_page=${itensPerPage}`,
    );
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
  }
  return result.data.reduce(function average(avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
};

export const startProject = async () => {
  console.log("startProject called2B");
  // getallProjects
  // add opened issues to a variable
  // call getIssuesByProjectPath to get the average of days from opened issues
  // save avg and opened issues to DB
  try {
    const projects: Project[] = await projectModel.getAll();
    const githubData: any = [];

    const promises = projects.map(async project => {
      const githubProjectData = await getProjectByProjectPath(project);
      /*
      const IssuesPromises = projects.map(async prj => {
        const mumberOfIssues = await getIssuesByProjectPath(prj);
        console.log("XXXXXXXXX mumberOfIssues: ", mumberOfIssues);
        prj.avg_opened_issues = mumberOfIssues;
        // githubData.push(githubProjectData);
      });

      await Promise.all(IssuesPromises);
      // return githubData;
*/
      githubData.push(githubProjectData);
    });

    await Promise.all(promises);

    for (let index = 0; index < projects.length; index += 1) {
      const githubProject = githubData.filter(filterByName(projects[index].full_name));
      if (githubProject.length) {
        projects[index].open_issues_count = githubProject[0].open_issues_count;
        projects[index].avg_opened_issues = await getIssuesByProjectPath(projects[index]);
        projectModel.update(projects[index]);
      }
    }

    githubData.forEach(project => {
      // const avg_opened_issues = await getIssuesByProjectPath(project);
      console.log(
        "[FULL name: ",
        project.full_name,
        "][open_issues_count: ",
        project.open_issues_count,
        "][avg_opened_issues: ",
        project.avg_opened_issues,
        "]",
      );
    });

    return githubData;
  } catch (error) {
    console.log(error);
  }
};
