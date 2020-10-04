import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import * as _ from "lodash";

const db = new JsonDB(new Config("src/config/db.json", true, false, '/'));

export let getData = async() => {
    console.log("getdata called");
    return db.getData("/");
}

export let incrementCount = async(id: number) => {
    
    let temp = await getData();
    console.log("increment data: ", temp[(id - 1)]['user_visit']);
    
    temp[(id - 1)]['user_visit'] = temp[(id - 1)]['user_visit'] + 1;
    db.push("/", temp);
    return 1;
}

export let getProjectByName = async(project_name: string) => {
    let temp = await getData();
    return _.chain(temp)
        .filter(function (x) { 
            return x.project_name == project_name 
        })
        .first()
        .value()
}

export let getProjectByID = async(id: number) => {
    let temp = await getData();
    return _.chain(temp)
        .filter(function (x) { 
            return x.id == id 
        })
        .first()
        .value()
}