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

appRouter.get("/start", async function startProject(_req, res) {
  console.log("startProject called");
  try {
    console.log("startProject called3");
    res.status(200).send(await projectController.startProject());
  } catch (error) {
    console.log("startProject called4");
    res.status(500).send();
  }
});

export default appRouter;
