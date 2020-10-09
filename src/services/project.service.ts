import axios from "axios";
import { Project } from "../beans/project";

import * as config from "../config/config.json";

const baseUrl = config.github_url;

const headers = {
  Accept: "application/vnd.github.v3+json",
  "Content-Type": "application/json",
  Authorization: "b856ffc3fe75466738ccfb1c58997db9191502e1",
};

export const getProjectByProjectPath = async (project: Project): Promise<Project> => {
  const projectPath = project.company_name.concat("/", project.project_name);
  const url = baseUrl.concat("repos/").concat(projectPath);
  const result = await axios.get(url, { headers });
  return result.data;
};

export const getIssuesByProjectPath = async (project: Project) => {
  const itensPerPage = 5; // 50
  const openIssues = 14; // 521
  let currentPage = 1;
  const totalPages = Math.ceil(openIssues / itensPerPage);
  const result = {
    data: [],
  };

  while (currentPage <= totalPages) {
    const issuesPath = project.company_name.concat(
      "/",
      project.project_name,
      `/issues?page=${currentPage}&per_page=${itensPerPage}`,
    );
    const url = baseUrl.concat("repos/").concat(issuesPath);
    console.log("caliing issues, url: ", url);
    const partial = await axios.get(url, { headers });
    result.data = result.data.concat(
      partial.data
        .filter(issue => issue.state === "open")
        .map(function getOpenDays(item: any) {
          const diffInTime = Math.abs(new Date().getTime() - new Date(item.created_at).getTime());
          const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
          return diffInDays;
        }),
    );
    currentPage += 1;
  }
  return result.data.reduce(function average(avg, value, _, { length }) {
    return avg + value / length;
  }, 0);
};
