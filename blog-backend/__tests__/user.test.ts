import { router as userRouter } from '../src/routes/user';
import request from 'supertest';
import express from 'express';
import { describe, it, expect, afterAll } from 'vitest';
import { prisma } from '../src/prisma/client';
import { TLoginBody, TSignupBody } from '../src/types/types';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', userRouter);

const author_key = process.env.AUTHOR_KEY;
const testPayload: TSignupBody = {
  username: 'testUser',
  email: 'test@gmail.com',
  password: 'Test1234@',
  confirm: 'Test1234@',
  authorKey: author_key || 'IAmACertifiedAuthor',
};
const testUser: TLoginBody = {
  email: 'test@gmail.com',
  password: 'Test1234@',
};

describe('user router tests', () => {
  afterAll(async () => {
    await prisma.user.delete({ where: { email: testPayload.email } });
  });
  describe('POST /signup success', () => {
    it('should create user and respond with json success message', async () => {
      const res = await request(app)
        .post('/signup')
        .send(testPayload)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors).toBeUndefined();
      expect(res.body.message).toEqual('Sign-up successful');
    });
  });
  describe('POST /signup fail', () => {
    it('should respond with username error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: 'test2@gmail.com', username: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Username must contain at least 3 characters'
      );
    });
    it('should respond with invalid email error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual('Invalid email');
    });
    it('should respond with email in use error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.errors[0].message).toEqual('Email already in use');
    });
    it('should respond with password error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: 'test2@gmail.com', password: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual(
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
      );
    });
    it('should respond with password mismatch error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: 'test2@gmail.com', confirm: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual("Passwords don't match");
    });
    it('should respond with author key error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: 'test2@gmail.com', authorKey: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toEqual('Invalid author key');
    });
  });
  describe('POST /login success', () => {
    it('should login user and return json web token/user data', async () => {
      const res = await request(app)
        .post('/login')
        .send(testUser)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
    });
  });
  describe('POST /login fail', () => {
    it('should return email not found error message', async () => {
      const res = await request(app)
        .post('/login')
        .send({ ...testUser, email: 'wrongemail@gmail.com' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.errors[0].message).toEqual('Email not found');
    });
    it('should return wrong password error message if email is correct', async () => {
      const res = await request(app)
        .post('/login')
        .send({ ...testUser, password: 'wrongpassword' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.errors[0].message).toEqual('Wrong password');
    });
  });
});
