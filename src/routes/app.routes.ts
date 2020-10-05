import { Router } from 'express';
import * as projectController from '../controllers/project.controller'

const appRouter = Router();

appRouter.get("/projects", async function (req, res) { 
    res.status(200).send(await projectController.getProjects());
  });

appRouter.get("/projects/:name", async function (req, res) {
    let project = await projectController.getProjectByName(req.params.name);
    if(project) {
        res.status(200).send(project);
    } else {
        res.status(404).send();
    }
  });

appRouter.get("/projects/:name/issues", async function (req, res) {
    let project = await projectController.getIssuesByProjectByName(req.params.name);
    if(project) {
        res.status(200).send(project);
    } else {
        res.status(404).send();
    }
  });

export default appRouter;
