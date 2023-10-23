import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestAdotante = Omit<AdotanteEntity, "id">;

type TipoResponseAdotante = {
  data?: Pick<AdotanteEntity, "nome" | "celular">;

  error?: {
    mensagem: string;
  };
};

export { TipoRequestAdotante, TipoResponseAdotante };
