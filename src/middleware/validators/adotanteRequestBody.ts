import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/TiposAdotante";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import crypto from "crypto";
import AdotanteEntity from "../../entities/AdotanteEntity";

yup.setLocale(pt);
const adotanteBodyValidator: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .matches(
      /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
      "celular inválido"
    )
    .required(),
  foto: yup.string().optional(),
  senha: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "senha inválida"
    ),
});

export const adotanteBodyValidatorMiddleware = async (
  req: Request<{}, {}, Partial<AdotanteEntity>>,
  res: Response,
  next: NextFunction
) => {
  try {
    await adotanteBodyValidator.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (erros) {
    const yupErrors = erros as yup.ValidationError;

    const validationErrors: Record<string, string> = {};
    yupErrors.inner.forEach((erros) => {
      if (!erros.path) return;
      validationErrors[erros.path] = erros.message;
    });
    return res.status(400).json({ erros: validationErrors });
  }
};
