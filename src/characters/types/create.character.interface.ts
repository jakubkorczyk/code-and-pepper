import { EpisodesEnum } from './episodes.enum';

export interface CreateCharacterInterface {
  name: string;
  episodes: Array<EpisodesEnum>;
  planet?: string;
}
