import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { adotanteBodyValidatorMiddleware } from "../middleware/validators/adotanteRequestBody";
import { enderecoBodyValidatorMiddleware } from "../middleware/validators/enderecoRequestBody";
import verificaIdMiddleware from "../middleware/verificaId";
const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

const validateAdotanteBody: RequestHandler = (req, res, next) =>
  adotanteBodyValidatorMiddleware(req, res, next);

const validateEnderecoBody: RequestHandler = (req, res, next) =>
  enderecoBodyValidatorMiddleware(req, res, next);

router.post("/", validateAdotanteBody, (req, res) =>
  adotanteController.criaAdotante(req, res)
);

router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));

router.put("/:id", verificaIdMiddleware, (req, res) =>
  adotanteController.atualizaAdotante(req, res)
);

router.delete("/:id", verificaIdMiddleware, (req, res) =>
  adotanteController.deletaAdotante(req, res)
);

router.patch("/:id", verificaIdMiddleware, validateEnderecoBody, (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
