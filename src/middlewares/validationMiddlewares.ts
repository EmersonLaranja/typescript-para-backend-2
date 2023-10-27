import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../tipos/TiposAdotante";
import { NextFunction, Request, Response } from "express";

const adotanteBodyValidator: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined(),
  foto: yup.string().optional(),
  senha: yup.string().defined().min(6).required(),
});

const adotanteBodyValidatorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await adotanteBodyValidator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {};
    yupErrors.inner.forEach((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    });
    return res.status(400).json({ error: validationErrors });
  }
};

export { adotanteBodyValidatorMiddleware };
