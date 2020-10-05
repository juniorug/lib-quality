import * as express from "express";
import { Config } from "./config/config";
import routes from './routes';


const app = express();
let config: Config = require('./config/config.json');
//app.use('/doc', express.static('swagger/public/doc'));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./config/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(routes);

app.listen(config.port, () => {
  console.log(`Server started at port: ${config.port}`);
});

export default app;