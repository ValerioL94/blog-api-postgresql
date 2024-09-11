import { router as commentRouter } from '../routes/comment';
import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll } from 'vitest';
import { prisma } from '../prisma/client';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import { jwtStrategy } from '../utils/jwt';
import { TCommentBody, TSignupBody } from '../types/types';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', commentRouter);
passport.use(jwtStrategy);

const userPayload: Omit<TSignupBody, 'confirm'> = {
  username: 'testUser',
  email: 'testUser@gmail.com',
  password: 'Test1234@',
};

const postPayload: { title: string; content: string; published: boolean } = {
  title: 'testPost',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula gravida nibh, sit amet feugiat ipsum scelerisque sit amet. Nunc tortor ipsum, sollicitudin at eros vitae, fermentum porta mauris. Nam consectetur malesuada luctus. Vivamus posuere massa sed magna condimentum malesuada. Maecenas vel tincidunt turpis. Maecenas porta sodales turpis at viverra. Phasellus volutpat ipsum in lectus suscipit, non efficitur orci interdum. Morbi egestas nisi fermentum sapien vulputate rhoncus. Fusce blandit et enim a vestibulum. Phasellus lacinia malesuada elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla purus. Nullam hendrerit augue vel sodales interdum. Maecenas eget augue pellentesque, euismod nisi in, dignissim justo. Phasellus.',
  published: false,
};

const commentPayload: TCommentBody = {
  username: 'testComment',
  content: 'Lorem ipsum dolor sit amet!',
};

describe('comment router tests', () => {
  let token: string;
  let testUserId: string;
  let testPostId: string;
  let testCommentId: string;
  beforeAll(async () => {
    const user = await prisma.user.findUnique({
      where: { email: userPayload.email },
      include: { posts: true },
    });
    if (!user) {
      await prisma.user.create({
        data: {
          username: userPayload.username,
          email: userPayload.username,
          password: userPayload.password,
          posts: { create: [postPayload] },
        },
      });
    }
    if (user) {
      const JWT_SECRET = process.env.SECRET || 'randomSecret';
      token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 600 });
      testUserId = user.id;
      testPostId = user.posts[0].id;
    }
  });
  describe('POST / success', () => {
    it('should create a comment and return success message', async () => {
      const res = await request(app)
        .post('/')
        .send(commentPayload)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.comment).toBeDefined();
      expect(res.body.message).toEqual('Comment created successfully');
      testCommentId = res.body.comment.id;
    });
  });
  describe('POST / fail', () => {
    it('should respond with username error message', async () => {
      const res = await request(app)
        .post('/')
        .send({ ...commentPayload, username: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Username must contain at least 3 characters'
      );
    });
    it('should respond with content error message', async () => {
      const res = await request(app)
        .post('/')
        .send({ ...commentPayload, content: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Content must contain at least 10 characters'
      );
    });
  });
  describe('PUT /:commentId success', () => {
    it('it should update specified comment and return success message', async () => {
      const res = await request(app)
        .put(`/${testCommentId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ ...commentPayload, username: 'edited username' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.message).toEqual('Comment updated successfully');
    });
  });
  describe('PUT /:commentId fail', () => {
    it('should respond with 401 unauthorized', async () => {
      await request(app)
        .put(`/${testCommentId}`)
        .send({ ...commentPayload, username: 'edited username' })
        .expect(401);
    });
    it('should respond with username error message', async () => {
      const res = await request(app)
        .put(`/${testCommentId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ ...commentPayload, username: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Username must contain at least 3 characters'
      );
    });
    it('should respond with content error message', async () => {
      const res = await request(app)
        .put(`/${testCommentId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({ ...commentPayload, content: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Content must contain at least 10 characters'
      );
    });
  });
  describe('DELETE /:commentId success', () => {
    it('should delete specified post and return success message', async () => {
      const res = await request(app)
        .delete(`/${testCommentId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.message).toEqual('Comment deleted successfully');
    });
  });
  describe('DELETE /:commentId fail', () => {
    it('should respond with 401 unauthorized', async () => {
      await request(app).delete(`/${testCommentId}`).expect(401);
    });
  });
});
