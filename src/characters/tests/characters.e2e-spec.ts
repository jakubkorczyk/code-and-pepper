import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { Repository } from 'typeorm';
import { CharacterEntity } from '../infrastructure/entities/character.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorsInterceptor } from '../../common/errors/error.filter';
import { EpisodesEnum } from '../types/episodes.enum';
import { CreateCharacterInterface } from '../types/create.character.interface';

describe('Characters endpoints (e2e)', () => {
  let app: INestApplication;
  let charactersRepository: Repository<CharacterEntity>;

  const incorectBodyCases = [
    { episodes: ['NEW_HOPE'], planet: 'Tatooine' },
    { name: 'Luke', episodes: ['WRONG_EPISODE'], planet: 'Tatooine' },
    { name: 'Luke', planet: 'Tatooine' },
    { name: 1, episodes: ['NEW_HOPE', 'PHANTOM_MENACE'], planet: 'Tatooine' },
    { name: 'Luke', episodes: ['NEW_HOPE'], planet: 1 },
  ];
  const correctBody: CreateCharacterInterface = {
    name: 'Luke',
    episodes: [EpisodesEnum.NEW_HOPE, EpisodesEnum.PHANTOM_MENACE],
    planet: 'Tatooine',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    app.useGlobalFilters(new ErrorsInterceptor());
    charactersRepository = moduleFixture.get(
      getRepositoryToken(CharacterEntity),
    );

    await app.init();
    await charactersRepository.clear();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /characters', () => {
    it('returns 200 and list of characters', async () => {
      const charactersCount = 10;
      const iterations = Array.from({ length: charactersCount });
      await Promise.all(
        iterations.map(() =>
          request(app.getHttpServer()).post('/characters').send(correctBody),
        ),
      );

      const result = await request(app.getHttpServer()).get('/characters');

      expect(result.status).toBe(200);
      const charactersWithoutId = result.body.characters.map(
        (character: any) => {
          delete character.id;
          return character;
        },
      );
      expect(charactersWithoutId).toMatchSnapshot();
    });

    it('returns 200 and uses pagination', async () => {
      const limit = 20;
      const charactersCount = 100;
      const iterations = Array.from({ length: charactersCount });
      const characters = iterations.map(() => correctBody);
      await charactersRepository.save(characters);

      const resultPageOne = await request(app.getHttpServer()).get(
        `/characters?page=1&limit=${limit}`,
      );
      const resultPageTwo = await request(app.getHttpServer()).get(
        `/characters?page=2&limit=${limit}`,
      );

      expect(resultPageOne.status).toBe(200);
      expect(resultPageOne.body.characters.length).toBe(limit);
      expect(resultPageTwo.body.characters.length).toBe(limit);
      expect(resultPageTwo.body.characters).not.toEqual(
        expect.arrayContaining(resultPageOne.body.characters),
      );
    });
  });

  describe('GET /characters/:id', () => {
    it('returns 200 and list of characters', async () => {
      const {
        body: { id },
      } = await request(app.getHttpServer())
        .post('/characters')
        .send(correctBody);

      const result = await request(app.getHttpServer()).get(
        `/characters/${id}`,
      );

      expect(result.status).toBe(200);

      expect(result.body).toHaveProperty('id', id);
      expect(result.body).toHaveProperty('episodes', correctBody.episodes);
      expect(result.body).toHaveProperty('planet', correctBody.planet);
      expect(result.body).toHaveProperty('name', correctBody.name);
    });
  });

  describe('POST /characters', () => {
    it.each(incorectBodyCases)(
      'validates body and returns 400 if its not correct',
      (body) => {
        return request(app.getHttpServer())
          .post('/characters')
          .send(body)
          .expect(400);
      },
    );

    it('Returns 201 and id of created character', async () => {
      const response = await request(app.getHttpServer())
        .post('/characters')
        .send(correctBody);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('PUT /characters/:id', () => {
    it.each(incorectBodyCases)(
      'validates body and returns 400 if its not correct',
      (body) => {
        return request(app.getHttpServer())
          .put('/characters/id')
          .send(body)
          .expect(400);
      },
    );

    const updatedBody = {
      name: 'Updated Luke',
      episodes: ['NEW_HOPE', 'EMPIRE_STRIKES_BACK'],
      planet: 'Tatooine',
    };

    it('updates character with given paylod', async () => {
      const {
        body: { id },
      } = await request(app.getHttpServer())
        .post('/characters')
        .send(correctBody);

      const updateResult = await request(app.getHttpServer())
        .put(`/characters/${id}`)
        .send(updatedBody);

      expect(updateResult.status).toBe(204);

      const updatedCharacter = await charactersRepository.findOne({
        where: { id },
      });
      expect(updatedCharacter).toMatchObject(updatedBody);
    });

    it('returns 404 if there is no character with given id', () => {
      const notExistingId = 'fa768401-264d-40b6-9478-a4c54f9950f4';

      return request(app.getHttpServer())
        .put(`/characters/${notExistingId}`)
        .send(updatedBody)
        .expect(404);
    });
  });

  describe('DELETE /characters/:id', () => {
    it('removes character by given id', async () => {
      const {
        body: { id },
      } = await request(app.getHttpServer())
        .post('/characters')
        .send(correctBody);

      const deleteResult = await request(app.getHttpServer()).delete(
        `/characters/${id}`,
      );

      expect(deleteResult.status).toBe(204);

      return request(app.getHttpServer()).get(`/characters/${id}`).expect(404);
    });
  });
});
