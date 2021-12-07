const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const user = require("./Schemas/user.schema");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "14082363482-mru7r6gtg8ek1l4vme9jlsrlsvm8vhl9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      let User = await user
        .findOne({ email: profile._json.email })
        .lean()
        .exec();
      if (!User) {
        User = await user.create({
          email: profile._json.email,
          name: profile._json.name,
          profile_pic: profile._json.picture,
        });
      }
      done(null, User);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "627882748352948",
      clientSecret: "97451c8707c08a1e533d661c45cc5df8",
      callbackURL: "http://localhost/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, "done");
    }
  )
);

module.exports = passport;
