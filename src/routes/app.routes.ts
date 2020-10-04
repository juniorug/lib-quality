import { Router } from 'express';
import * as projectController from '../controllers/projec.controller'

const appRouter = Router();

appRouter.get("/projects", (request, response) => {
    response.json({
      message: "Hello Projects",
    });
  });

appRouter.get("/projects/:name", async function (req, res) {  
    res.status(200).send(await projectController.getProjectByName(req.params.name));
  });


export default appRouter;
