import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passportJwt from 'passport-jwt';
import { prisma } from '../prisma/client';

const JWT_SECRET = process.env.SECRET!;

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: jwt_payload.email },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }

  //   function (jwt_payload, done) {
  //     prisma.user
  //       .findUnique({ where: { email: jwt_payload.email } })
  //       .then((user) => {
  //         if (user) {
  //           return done(null, true);
  //         } else {
  //           return done(null, false);
  //         }
  //       })
  //       .catch((error) => {
  //         return done(error, false);
  //       });
  //   }
);
