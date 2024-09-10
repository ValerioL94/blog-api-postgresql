import { router as postRouter } from '../routes/post';
import request from 'supertest';
import express from 'express';
import { describe, it, expect, beforeAll } from 'vitest';
import { prisma } from '../prisma/client';
import { TPostBody, TSignupBody } from '../types/types';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { jwtStrategy } from '../utils/jwt';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', postRouter);
passport.use(jwtStrategy);

const userPayload: Omit<TSignupBody, 'confirm'> = {
  username: 'testUser',
  email: 'testUser@gmail.com',
  password: 'Test1234@',
};

const postPayload: TPostBody = {
  title: 'testPost',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula gravida nibh, sit amet feugiat ipsum scelerisque sit amet. Nunc tortor ipsum, sollicitudin at eros vitae, fermentum porta mauris. Nam consectetur malesuada luctus. Vivamus posuere massa sed magna condimentum malesuada. Maecenas vel tincidunt turpis. Maecenas porta sodales turpis at viverra. Phasellus volutpat ipsum in lectus suscipit, non efficitur orci interdum. Morbi egestas nisi fermentum sapien vulputate rhoncus. Fusce blandit et enim a vestibulum. Phasellus lacinia malesuada elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel fringilla purus. Nullam hendrerit augue vel sodales interdum. Maecenas eget augue pellentesque, euismod nisi in, dignissim justo. Phasellus.',
  published: 'false',
  authorId: '',
};

describe('post router tests', () => {
  let token: string;
  let testUserId: string;
  let testPostId: string;
  beforeAll(async () => {
    const user = await prisma.user.findUnique({
      where: { email: userPayload.email },
    });
    if (!user) {
      await prisma.user.create({ data: userPayload });
    }
    if (user) {
      const JWT_SECRET = process.env.SECRET || 'randomSecret';
      token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 600 });
      testUserId = user.id;
    }
  });
  describe('GET / ', () => {
    it('should return all available posts', async () => {
      const res = await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.posts).toBeDefined();
    });
  });
  describe('POST / success', () => {
    it('should create a post and return success message', async () => {
      const res = await request(app)
        .post('/')
        .set('Authorization', 'Bearer ' + token)
        .send({ ...postPayload, authorId: testUserId })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.post).toBeDefined();
      expect(res.body.message).toEqual('Post created successfully');
      testPostId = res.body.post.id;
    });
  });
  describe('POST / fail', () => {
    it('should respond with 401 unauthorized', async () => {
      await request(app)
        .post('/')
        .send({ ...postPayload, authorId: testUserId })
        .expect(401);
    });
    it('should respond with title error message', async () => {
      const res = await request(app)
        .post('/')
        .set('Authorization', 'Bearer ' + token)
        .send({ ...postPayload, title: '', authorId: testUserId })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Title must contain at least 3 characters'
      );
    });
    it('should respond with content error message', async () => {
      const res = await request(app)
        .post('/')
        .set('Authorization', 'Bearer ' + token)
        .send({ ...postPayload, content: '', authorId: testUserId })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Content must contain at least 50 characters'
      );
    });
  });
  describe('GET /:postId', () => {
    it('should return specified post', async () => {
      const res = await request(app)
        .get(`/${testPostId}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.post).toBeDefined();
    });
  });
  describe('PUT /:postId success', () => {
    it('it should update specified post and return success message', async () => {
      const res = await request(app)
        .put(`/${testPostId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'editedTitle',
          content: postPayload.content,
          published: 'false',
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.message).toEqual('Post updated successfully');
    });
  });
  describe('PUT /:postId fail', () => {
    it('should respond with 401 unauthorized', async () => {
      await request(app)
        .put(`/${testPostId}`)
        .send({
          title: 'editedTitle',
          content: postPayload.content,
          published: 'false',
        })
        .expect(401);
    });
    it('should respond with title error message', async () => {
      const res = await request(app)
        .put(`/${testPostId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: '',
          content: postPayload.content,
          published: 'false',
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Title must contain at least 3 characters'
      );
    });
    it('should respond with content error message', async () => {
      const res = await request(app)
        .put(`/${testPostId}`)
        .set('Authorization', 'Bearer ' + token)
        .send({
          title: 'editedTitle',
          content: '',
          published: 'false',
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Content must contain at least 50 characters'
      );
    });
  });
  describe('DELETE /:postId success', () => {
    it('should delete specified post and return success message', async () => {
      const res = await request(app)
        .delete(`/${testPostId}`)
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.message).toEqual('Post deleted successfully');
    });
  });
  describe('DELETE /:postId fail', () => {
    it('should respond with 401 unauthorized', async () => {
      await request(app).delete(`/${testPostId}`).expect(401);
    });
  });
});
