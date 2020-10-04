import { Router } from 'express';
import * as projectController from '../controllers/project.controller'

const appRouter = Router();

appRouter.get("/projects", async function (req, res) { 
    console.log("router get projects called"); 
    res.status(200).send(await projectController.getProjects());
  });

appRouter.get("/projects/:name", async function (req, res) {  
    res.status(200).send(await projectController.getProjectByName(req.params.name));
  });


export default appRouter;
