import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

type TipoResponseBodyAdotante = {
  data?: Pick<AdotanteEntity, "nome" | "celular">;

  error?: {
    mensagem: string;
  };
};

export { TipoRequestBodyAdotante, TipoResponseBodyAdotante };
