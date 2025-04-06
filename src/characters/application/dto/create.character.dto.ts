import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { EpisodesEnum } from '../../types/episodes.enum';
import { CreateCharacterInterface } from '../../types/create.character.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCharacterDto implements CreateCharacterInterface {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: EpisodesEnum,
    enumName: 'EpisodesEnum',
  })
  @IsArray()
  @IsEnum(EpisodesEnum, { each: true })
  episodes: EpisodesEnum[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  planet?: string;
}
