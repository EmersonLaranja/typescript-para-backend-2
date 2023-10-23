import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

type TipoResponseBodyAdotante = {
  data?: Pick<AdotanteEntity, "nome" | "celular">;

  error?: unknown;
};

type TipoRequestParamsAdotante = {
  id: string;
};

export {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
};
