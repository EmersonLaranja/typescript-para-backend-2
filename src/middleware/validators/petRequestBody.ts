import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import PetEntity from "../../entities/PetEntity";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import tratarErroValidacaoYup from "../../utils/trataValidacaoYup";
yup.setLocale(pt);

const petBodyValidator: yup.ObjectSchema<
  Omit<TipoRequestBodyPet, "adotante" | "abrigo">
> = yup.object({
  nome: yup.string().defined().required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)).optional(),
  especie: yup.string().oneOf(Object.values(EnumEspecie)).required().defined(),
  dataDeNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});

export const petBodyValidatorMiddleware = async (
  req: Request<{}, {}, Partial<PetEntity>>,
  res: Response,
  next: NextFunction
) => {
  tratarErroValidacaoYup(petBodyValidator, req, res, next);
};
