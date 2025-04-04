import { EpisodesEnum } from './episodes.enum';

export interface CharacterInterface {
  name: string;
  episodes: Array<EpisodesEnum>;
  planet?: string;
}
