import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import { prisma } from '../prisma/client';

const JWT_SECRET = process.env.SECRET || 'randomSecret';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
function verify(jwt_payload: { id: string }, done: VerifiedCallback) {
  prisma.user
    .findUnique({ where: { id: jwt_payload.id } })
    .then((user) => {
      if (user) {
        return done(null, true);
      } else {
        return done(null, false);
      }
    })
    .catch((error) => {
      return done(error, false);
    });
}
export const jwtStrategy: JwtStrategy = new JwtStrategy(opts, verify);
