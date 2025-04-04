import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('Characters endpoints (e2e)', () => {
  let app: INestApplication;

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
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /characters', () => {
    it('returns 200 and list of characters', () => {
      return request(app.getHttpServer()).get('/characters').expect(200);
    });
  });

  const incorectBodyCases = [
    { episodes: ['NEW_HOPE'], planet: 'Tatooine' },
    { name: 'Luke', episodes: ['WRONG_EPISODE'], planet: 'Tatooine' },
    { name: 'Luke', planet: 'Tatooine' },
    { name: 1, episodes: ['NEW_HOPE'], planet: 'Tatooine' },
    { name: 'Luke', episodes: ['NEW_HOPE'], planet: 1 },
  ];

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
  });
});
