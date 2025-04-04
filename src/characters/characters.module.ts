import { Module } from '@nestjs/common';
import { CharactersController } from './application/characters.controller';
import { CharactersService } from './domain/characters.service';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
