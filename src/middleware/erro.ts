import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../utils/manipulaErros";
import { HttpStatus } from "../enum/EnumHttpStatus";

export const erroMiddleware = (
  error: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? HttpStatus.ERRO_INTERNO;

  const mensagem = error.statusCode
    ? error.message
    : "Erro interno do servidor";
  return res.status(statusCode).json({ mensagem });
};
