import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CharacterDto } from './character.dto';

export class CharactersListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterDto)
  characters: Array<CharacterDto>;
}
