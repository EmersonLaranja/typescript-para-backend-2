import { HttpStatus } from "../enum/EnumHttpStatus";

export class ManipulaErros extends Error {
  public readonly statusCode: HttpStatus;
  constructor(mensagem: string, status: number) {
    super(mensagem);
    this.statusCode = status;
  }
}

export class NaoEncontrado extends ManipulaErros {
  constructor(mensagem: string) {
    super(mensagem, HttpStatus.NAO_ENCONTRADO);
  }
}
