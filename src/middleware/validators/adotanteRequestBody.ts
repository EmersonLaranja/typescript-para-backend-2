import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/TiposAdotante";
import * as yup from "yup";
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

export const adotanteBodyValidatorMiddleware = async (
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
