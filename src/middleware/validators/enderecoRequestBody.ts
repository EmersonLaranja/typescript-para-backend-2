import * as yup from "yup";
import { pt } from "yup-locale-pt";
import EnderecoEntity from "../../entities/Endereco";
import { NextFunction, Request, Response } from "express";
yup.setLocale(pt);

const enderecoBodyValidator: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required().max(20),
  });

export const enderecoBodyValidatorMiddleware = async (
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
