import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../../models/user.model";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

passport.use(
  "jwt",
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
