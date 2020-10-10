import * as express from "express";
import routes from "./routes";
import projectController from "./controllers/project.controller";

import swaggerUi = require("swagger-ui-express");
import config = require("./config/config.json");
import swaggerDocument = require("./config/swagger.json");

const app = express();

// app.use("/doc", express.static("swagger/public/doc"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server started at port: ${config.port}`);
  projectController.startProject();
});

export default app;
