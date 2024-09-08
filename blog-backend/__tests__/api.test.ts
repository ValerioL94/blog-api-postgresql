import { router as apiRouter } from '../routes/api';
import request from 'supertest';
import express from 'express';
import { describe, it, expect } from 'vitest';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', apiRouter);

describe('GET /api', () => {
  it('should return the specified json message', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.message).toBe(
      'From /api you can get to the following paths: /users , /posts , /posts/comments'
    );
    // console.log(res.body.message);
  });
});
