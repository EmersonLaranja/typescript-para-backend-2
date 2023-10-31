import "express-async-errors";
import express from "express";
import petRouter from "../routes/petRouter";
import adotanteRouter from "../routes/adotanteRouter";
import { ManipulaErros } from "../utils/manipulaErros";
const router = (app: express.Router) => {
  app.use("/teste", async () => {
    throw new Error("teste");
  });

  app.use("/pets", petRouter);
  app.use("/adotantes", adotanteRouter);
};
export default router;
