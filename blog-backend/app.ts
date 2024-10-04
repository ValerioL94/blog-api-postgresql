import express, { NextFunction, Request, Response } from 'express';
import createError, { HttpError } from 'http-errors';
import passport from 'passport';
import cors from 'cors';
import { router as apiRouter } from './routes/api';
import { jwtStrategy } from './utils/jwt';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passport.use(jwtStrategy);
app.get('/', (req, res) => res.redirect('/api'));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});
