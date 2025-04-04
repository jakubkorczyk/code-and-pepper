import { Injectable, NotFoundException } from '@nestjs/common';
import { CharacterEntity } from '../infrastructure/entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCharacterInterface } from '../types/create.character.interface';
import { CharacterInterface } from '../types/character.interface';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly characterRepository: Repository<CharacterEntity>,
  ) {}

  public async createCharacter(character: CreateCharacterInterface): Promise<{
    id: string;
  }> {
    const { id } = await this.characterRepository.save(character);

    return {
      id,
    };
  }

  public async getCharacters(
    page: number = 1,
    limit: number = 10,
  ): Promise<Array<CharacterInterface>> {
    const offset = (page - 1) * limit;

    return this.characterRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async getCharacter(id: string): Promise<CharacterInterface> {
    return this.characterRepository.findOneOrFail({
      where: { id },
    });
  }

  public async updateCharacter(
    id: string,
    character: CreateCharacterInterface,
  ): Promise<void> {
    const result = await this.characterRepository.update(
      {
        id,
      },
      character,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`There' no character with id: ${id}`);
    }
  }

  public async removeCharacter(id: string): Promise<void> {
    await this.characterRepository.delete({
      id,
    });
  }
}
