import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import AdotanteEntity from "../../entities/AdotanteEntity";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import tratarErroValidacaoYup from "../../utils/tratarValidacaoYup";

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
  tratarErroValidacaoYup(adotanteBodyValidator, req, res, next);
};
