import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import AbrigoController from "../controller/AbrigoController";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { abrigoBodyValidatorMiddleware } from "../middleware/validators/abrigoRequestBody";
import { enderecoBodyValidatorMiddleware } from "../middleware/validators/enderecoRequestBody";
import verificaIdMiddleware from "../middleware/verificaId";
const router = express.Router();
const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity")
);
const abrigoController = new AbrigoController(abrigoRepository);

const validateAbrigoBody: RequestHandler = (req, res, next) =>
  abrigoBodyValidatorMiddleware(req, res, next);

const validateEnderecoBody: RequestHandler = (req, res, next) =>
  enderecoBodyValidatorMiddleware(req, res, next);

router.post("/", validateAbrigoBody, (req, res) =>
  abrigoController.criaAbrigo(req, res)
);

router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));

router.put("/:id", verificaIdMiddleware, (req, res) =>
  abrigoController.atualizaAbrigo(req, res)
);

router.delete("/:id", verificaIdMiddleware, (req, res) =>
  abrigoController.deletaAbrigo(req, res)
);

router.patch("/:id", verificaIdMiddleware, validateEnderecoBody, (req, res) =>
  abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;
