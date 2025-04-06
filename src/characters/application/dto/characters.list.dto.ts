import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterDto } from './character.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CharactersListDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  characters: Array<CharacterDto>;
}
