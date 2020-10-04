import * as express from "express";
import { Config } from "./config/config";
import routes from './routes';


const app = express(); // Criamos uma instância do express
let config: Config = require('./config/config.json');

app.use(express.json());
app.use(routes);

// Iniciamos nosso servidor web
app.listen(config.port, () => {
  console.log(`Server started at port: ${config.port}`);
});

export default app;