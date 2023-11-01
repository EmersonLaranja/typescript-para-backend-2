import * as yup from "yup";
import { pt } from "yup-locale-pt";
import EnderecoEntity from "../../entities/Endereco";
import { NextFunction, Request, Response } from "express";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";
yup.setLocale(pt);

export const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required().max(20),
  });

export const middlewareValidadorBodyEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  tratarErroValidacaoYup(esquemaBodyEndereco, req, res, next);
};
