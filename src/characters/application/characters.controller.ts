import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCharacterDto } from './dto/create.character.dto';
import { UUIDIdDto } from '../../common/application/UUIDIdDto';
import { CharactersService } from '../domain/characters.service';
import { CharactersListDto } from './dto/characters.list.dto';
import { CharacterInterface } from '../types/character.interface';
import { PaginationDto } from '../../common/application/pagination.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters(
    @Query() { page, limit }: PaginationDto,
  ): Promise<CharactersListDto> {
    return {
      characters: await this.charactersService.getCharacters(page, limit),
    };
  }

  @Get('/:id')
  async getCharacter(@Param() { id }: UUIDIdDto): Promise<CharacterInterface> {
    return this.charactersService.getCharacter(id);
  }

  @Post()
  @HttpCode(201)
  async createCharacter(
    @Body() character: CreateCharacterDto,
  ): Promise<UUIDIdDto> {
    return this.charactersService.createCharacter(character);
  }

  @Put(':id')
  @HttpCode(204)
  async updateCharacter(
    @Param() { id }: UUIDIdDto,
    @Body() character: CreateCharacterDto,
  ): Promise<void> {
    return this.charactersService.updateCharacter(id, character);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCharacter(@Param() { id }: UUIDIdDto): Promise<void> {
    return this.charactersService.removeCharacter(id);
  }
}
