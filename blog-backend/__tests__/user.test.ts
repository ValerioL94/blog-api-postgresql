import { router as userRouter } from '../routes/user';
import request from 'supertest';
import express from 'express';
import { describe, it, expect, afterAll } from 'vitest';
import { prisma } from '../prisma/client';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', userRouter);

const testPayload = {
  username: 'testUser',
  email: 'test@gmail.com',
  password: 'Test1234@',
  confirm: 'Test1234@',
};

describe('user router test', () => {
  afterAll(async () => {
    await prisma.user.delete({ where: { email: testPayload.email } });
  });
  describe('POST /signup', () => {
    it('should create user and respond with json success message', async () => {
      const res = await request(app)
        .post('/signup')
        .send(testPayload)

        .expect('Content-Type', /json/)
        .expect(200);

      console.log(res.body.errors);
      expect(res.body.errors).toBeUndefined();

      expect(res.body.message).toBe('Sign-up successful');
    });
    it('should respond with username error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, username: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toBe(
        'Username must contain at least 3 characters'
      );
    });
    it('should respond with invalid email error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, email: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toBe('Invalid email');
    });
    it('should respond with email in use error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body.errors[0].message).toBe('Email already in use');
    });
    it('should respond with password error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, password: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(res.body.errors[0].message).toBe(
        'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number'
      );
    });
    it('should respond with password mismatch error message', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ ...testPayload, confirm: '' })
        .expect('Content-Type', /json/)
        .expect(200);
      console.log(res.body.errors);

      expect(res.body.errors[1].message).toBe("Passwords don't match");
    });
  });
});
