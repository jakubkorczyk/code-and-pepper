import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { EpisodesEnum } from '../../types/episodes.enum';
import { CreateCharacterInterface } from '../../types/create.character.interface';

export class CreateCharacterDto implements CreateCharacterInterface {
  @IsString()
  name: string;

  @IsArray()
  @IsEnum(EpisodesEnum, { each: true })
  episodes: EpisodesEnum[];

  @IsOptional()
  @IsString()
  planet?: string;
}
