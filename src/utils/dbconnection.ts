import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import * as _ from "lodash";
import { Project } from "../beans/project";

const db = new JsonDB(new Config("src/config/db.json", true, false, "/"));

export const getData = async (): Promise<Project[]> => db.getData("/");

export const save = async (project: Project): Promise<void> => {
  const temp: Project[] = await getData();
  temp.push(project);
  db.push("/", temp);
};

export const getProjectByName = async (projectName: string): Promise<Project[]> => {
  const temp = await getData();
  const result = _.chain(temp)
    .filter((x: Project) => x.project_name === projectName)
    .first()
    .value();
  if (result) {
    temp[result.id - 1].user_visit = temp[result.id - 1].user_visit + 1;
    db.push("/", temp);
  }
  return result;
};

export const getProjectByID = async (id: number): Promise<Project> => {
  const temp = await getData();
  const result = _.chain(temp)
    .filter(x => x.id === id)
    .first()
    .value();
  temp[result.id - 1].user_visit = temp[result.id - 1].user_visit + 1;
  db.push("/", temp);
  return result;
};

export const updateProject = async (project: Project): Promise<Project[]> => {
  const temp = await getData();
  const result = _.chain(temp)
    .filter((x: Project) => x.id === project.id)
    .first()
    .value();
  if (result) {
    temp[result.id - 1] = project;
    db.push("/", temp);
  }
  return result;
};
