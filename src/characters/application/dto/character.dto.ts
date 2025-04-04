import { CreateCharacterDto } from './create.character.dto';
import { IsUUID } from 'class-validator';

export class CharacterDto extends CreateCharacterDto {
  @IsUUID()
  id: string;
}
