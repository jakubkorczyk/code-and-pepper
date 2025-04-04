import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { EpisodesEnum } from '../types/episodes.enum';
import { CharacterInterface } from '../types/character.interface';

export class CharacterDto implements CharacterInterface {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(EpisodesEnum, { each: true })
  episodes: EpisodesEnum[];

  @IsOptional()
  @IsString()
  planet?: string;
}
