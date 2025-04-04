import { Module } from '@nestjs/common';
import { CharactersController } from './application/characters.controller';
import { CharactersService } from './domain/characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './infrastructure/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
