import EnderecoEntity from "../entities/Endereco";

type TipoRequestAdotante = {
  nome: string;
  celular: string;
  senha: string;
  endereco?: EnderecoEntity;
  foto?: string;
};

type TipoResponseAdotante = {
  data: {
    nome: string;
    celular: string;
  };
  error?: {
    mensagem: string;
  };
};

export { TipoRequestAdotante, TipoResponseAdotante };
