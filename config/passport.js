const passport = require("passport");

const GoogleStrategy =
  require("passport-google-oauth20").Strategy;

const User = require("../models/user");

const ADMIN_EMAIL = "ishimweyaziid749@gmail.com";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const email = profile.emails[0].value;
        let user =
          await User.findOne({
            where: {
              email,
            },
          });

        const role = email === ADMIN_EMAIL ? "admin" : "user";

        if (!user) {
          user =
            await User.create({
              username:
                profile.displayName,

              email,

              password: "",

              role,
            });
        } else if (email === ADMIN_EMAIL && user.role !== "admin") {
          user.role = "admin";
          await user.save();
        }

        return done(null, user);

      } catch (error) {

        return done(error, null);
      }
    }
  )
);

module.exports = passport;