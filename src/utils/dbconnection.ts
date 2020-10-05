import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import * as _ from "lodash";
import { Project } from '../beans/project';

const db = new JsonDB(new Config("src/config/db.json", true, false, '/'));

export let save = async(project: Project) => {
    let temp: Project[] = await getData();
    temp.push(project)
    db.push("/", temp);
}

export let getData = async() => {
    return db.getData("/");
}
export let getProjectByName = async(project_name: string) => {
    let temp = await getData();
    let result = _.chain(temp)
        .filter(function (x) { 
            return x.project_name == project_name 
        })
        .first()
        .value();
    if(result) {
        temp[(result.id - 1)]['user_visit'] = temp[(result.id - 1)]['user_visit'] + 1;
        db.push("/", temp);
    }
    return result
}

export let getProjectByID = async(id: number) => {
    let temp = await getData();
    let result = _.chain(temp)
        .filter(function (x) { 
            return x.id == id 
        })
        .first()
        .value()
    temp[(result.id - 1)]['user_visit'] = temp[(result.id - 1)]['user_visit'] + 1;
    db.push("/", temp);
    return result;
}