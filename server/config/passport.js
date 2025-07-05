const GoogelStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

module.exports = function (passport) {
  // Only initialize Google strategy if environment variables are set
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogelStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              done(null, user);
            } else {
              const newUser = {
                username: profile.name.givenName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
                googleId: profile.id,
              };
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (error) {
            console.error(error);
          }
        }
      )
    );
  } else {
    console.log(
      "Google OAuth not configured - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET"
    );
  }

  // Only initialize Twitter strategy if environment variables are set
  if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(
      new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL: "/auth/twitter/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              done(null, user);
            } else {
              const newUser = {
                username: profile.name.givenName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
                twitterId: profile.id,
              };
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (error) {
            console.error(error);
          }
        }
      )
    );
  } else {
    console.log(
      "Twitter OAuth not configured - missing TWITTER_CONSUMER_KEY or TWITTER_CONSUMER_SECRET"
    );
  }
};
