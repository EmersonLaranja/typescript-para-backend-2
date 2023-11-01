import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}

  private async existeAbrigoComCelular(celular: string) {
    return await this.repository.findOne({ where: { celular } });
  }

  private async existeAbrigoComEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    const [abrigoComCelular, abrigoComEmail] = await Promise.all([
      this.existeAbrigoComCelular(abrigo.celular),
      this.existeAbrigoComEmail(abrigo.email),
    ]);

    if (abrigoComCelular || abrigoComEmail) {
      throw new RequisicaoRuim(
        "Já existe um abrigo com esse celular ou email!"
      );
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
