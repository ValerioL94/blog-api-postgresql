import { router as apiRouter } from '../routes/api.ts';
import request from 'supertest';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', apiRouter);

describe('api router test', () => {
  it('it should return the correct json response', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect({
        navigation: 'From /api you can get to the following paths',
        paths: ['/users', '/posts', '/posts/comments'],
      })
      .expect(200, done);
  });
});
