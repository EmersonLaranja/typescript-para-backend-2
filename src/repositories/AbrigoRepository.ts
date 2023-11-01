import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}

  private existeAbrigoComCelular(celular: string): boolean {
    return !!this.repository.findOne({ where: { celular } });
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    if (this.existeAbrigoComCelular(abrigo.celular)) {
      throw new RequisicaoRuim("Já existe um abrigo com esse celular!");
    }
    await this.repository.save(abrigo);
  }

  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(id: number, newData: AbrigoEntity) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    Object.assign(abrigoToUpdate, newData);

    await this.repository.save(abrigoToUpdate);
  }

  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    await this.repository.remove(abrigoToRemove);
  }

  async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity) {
    const abrigo = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!abrigo) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);
  }
}
