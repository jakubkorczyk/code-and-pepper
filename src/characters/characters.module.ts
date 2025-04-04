import { Module } from '@nestjs/common';
import { CharactersController } from './application/characters.controller';

@Module({
  controllers: [CharactersController],
})
export class CharactersModule {}
