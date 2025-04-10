import { CreateCharacterDto } from './create.character.dto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterDto extends CreateCharacterDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
