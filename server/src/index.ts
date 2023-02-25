import express, { Express } from "express";
import cors from "cors";

import { AppDataSource } from "./database/data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const api: Express = express();

  api.use(express.json(), cors());

  api.use(routes);

  return api.listen(process.env.PORT, () => {
    console.log("Servidor OK - Porta: ", process.env.PORT);
  });
});
