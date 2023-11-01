import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { petBodyValidatorMiddleware } from "../middleware/validators/petRequestBody";
import verificaIdMiddleware from "../middleware/verificaId";
const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const validatePetBody: RequestHandler = (req, res, next) =>
  petBodyValidatorMiddleware(req, res, next);

router.post("/", validatePetBody, (req, res) =>
  petController.criaPet(req, res)
);
router.get("/", (req, res) => petController.listaPet(req, res));
router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
);

router.put("/:id", verificaIdMiddleware, (req, res) =>
  petController.atualizaPet(req, res)
);
router.delete("/:id", verificaIdMiddleware, (req, res) =>
  petController.deletaPet(req, res)
);
router.put("/:pet_id/:adotante_id", verificaIdMiddleware, (req, res) =>
  petController.adotaPet(req, res)
);

export default router;
