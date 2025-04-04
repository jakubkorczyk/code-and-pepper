import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EpisodesEnum } from '../../types/episodes.enum';

@Entity('characters')
export class CharacterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  planet?: string;

  @Column('text', { array: true })
  episodes: EpisodesEnum[];
}
