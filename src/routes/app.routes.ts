import { Router } from "express";
import * as cors from "cors";
import * as projectController from "../controllers/project.controller";

const appRouter = Router();

const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};
appRouter.use(cors(options));

appRouter.get("/projects", async function getAll(_req, res) {
  res.status(200).send(await projectController.getProjects());
});

appRouter.get("/projects/:id", async function getProjectsByID(req, res) {
  const project = await projectController.getProjectById(parseInt(req.params.id));
  if (project) {
    res.status(200).send(project);
  } else {
    res.status(404).send();
  }
});

appRouter.get("/projects/name/:name", async function getProjectsByName(req, res) {
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
  try {
    res.status(200).send(await projectController.startProject());
  } catch (error) {
    res.status(500).send();
  }
});

export default appRouter;
