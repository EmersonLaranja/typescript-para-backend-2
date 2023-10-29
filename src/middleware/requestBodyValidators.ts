import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../tipos/TiposAdotante";
import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../entities/Endereco";
import { pt } from "yup-locale-pt";

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
      "Celular inválido"
    )
    .required(),
  foto: yup.string().optional(),
  senha: yup.string().defined().min(6).required(),
});

const enderecoBodyValidator: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required().max(20),
  });

const adotanteBodyValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await adotanteBodyValidator.validate(req.body, { abortEarly: false });
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

const enderecoBodyValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await enderecoBodyValidator.validate(req.body, { abortEarly: false });
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

export { adotanteBodyValidatorMiddleware, enderecoBodyValidatorMiddleware };
