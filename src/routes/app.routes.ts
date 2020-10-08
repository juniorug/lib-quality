import { Router } from "express";
import * as projectController from "../controllers/project.controller";

const appRouter = Router();

appRouter.get("/projects", async function getAll(_req, res) {
  res.status(200).send(await projectController.getProjects());
});

appRouter.get("/projects/:name", async function getProjectsByName(req, res) {
  const project = await projectController.getProjectByName(req.params.name);
  if (project) {
    res.status(200).send(project);
  } else {
    res.status(404).send();
  }
});

appRouter.get("/projects/:name/issues", async function getProjectIssues(req, res) {
  const project = await projectController.getIssuesByProjectByName(req.params.name);
  if (project) {
    res.status(200).send(project);
  } else {
    res.status(404).send();
  }
});

export default appRouter;
