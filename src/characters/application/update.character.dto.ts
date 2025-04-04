import { PartialType } from '@nestjs/mapped-types';
import { CharacterDto } from './character.dto';

export class UpdateCharacterDto extends PartialType(CharacterDto) {}
