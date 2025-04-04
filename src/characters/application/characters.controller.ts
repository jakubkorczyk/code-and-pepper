import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CharacterDto } from './character.dto';
import { ResourceCreatedDto } from '../../common/application/resource.created.dto';
import { UpdateCharacterDto } from './update.character.dto';

@Controller('characters')
export class CharactersController {
  @Get()
  async getCharacters(): Promise<Array<CharacterDto>> {
    return [];
  }

  @Post()
  async createCharacter(
    @Body() character: CharacterDto,
  ): Promise<ResourceCreatedDto> {
    return {
      id: '',
    };
  }

  @Put(':id')
  async updateCharacter(
    @Param('id') id: string,
    @Body() character: CharacterDto,
  ): Promise<void> {}

  @Delete(':id')
  async deleteCharacter(@Param('id') id: string): Promise<void> {}
}
