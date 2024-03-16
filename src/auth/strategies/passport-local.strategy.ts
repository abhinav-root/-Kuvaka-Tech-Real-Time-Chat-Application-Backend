import passport from "passport";
import passportLocal from "passport-local";
import User from "../../models/user.model";
import bcrypt from "bcrypt";

passport.use(
  "local",
  new passportLocal.Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
