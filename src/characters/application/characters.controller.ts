import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create.character.dto';
import { ResourceCreatedDto } from '../../common/application/resource.created.dto';
import { CharactersService } from '../domain/characters.service';
import { CharactersListDto } from './dto/characters.list.dto';
import { CharacterInterface } from '../types/character.interface';
import { CharacterDto } from './dto/character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters(): Promise<CharactersListDto> {
    return { characters: await this.charactersService.getCharacters() };
  }

  @Get('/:id')
  async getCharacter(@Param('id') id: string): Promise<CharacterInterface> {
    return this.charactersService.getCharacter(id);
  }

  @Post()
  async createCharacter(
    @Body() character: CreateCharacterDto,
  ): Promise<ResourceCreatedDto> {
    return this.charactersService.createCharacter(character);
  }

  @Put(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() character: CreateCharacterDto,
  ): Promise<void> {
    return this.charactersService.updateCharacter(id, character);
  }

  @Delete(':id')
  async deleteCharacter(@Param('id') id: string): Promise<void> {
    return this.charactersService.removeCharacter(id);
  }
}
