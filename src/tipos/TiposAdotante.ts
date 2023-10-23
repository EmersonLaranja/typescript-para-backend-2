import AdotanteEntity from "../entities/AdotanteEntity";
import {
  TipoRequestBody,
  TipoRequestParams,
  TipoResponseBody,
} from "./TiposHttp";

type AdotanteKeys = "id" | "nome" | "celular";

// // Exemplo de uso para AdotanteEntity
export type TipoRequestBodyAdotante = TipoRequestBody<AdotanteEntity>;
export type TipoResponseBodyAdotante = TipoResponseBody<
  AdotanteEntity,
  AdotanteKeys
>;

export type TipoRequestParamsAdotante = TipoRequestParams;
