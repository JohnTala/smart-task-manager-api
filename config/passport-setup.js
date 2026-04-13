const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Task = require('../models/Task');
const Comment = require('../models/Comment');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.SECRET_CLIENT,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            googleId: profile.id,
            serviceProvider: profile.provider,
            photoUrl:
              profile.photos?.length > 0 ? profile.photos[0].value : '',
          });

          // AUTO CREATE TASK
          const task = await Task.create({
            userId: user._id,
            title: 'Welcome Task',
            description: 'First task created automatically after login',
            status: 'pending',
            priority: 'low',
          });

          // AUTO CREATE COMMENT LINKED TO TASK
          await Comment.create({
            user: user._id,
            task: task._id,
            text: 'First comment automatically created',
          });

          console.log('New user + task + comment created');
        } else {
          console.log('User already exists:', user.username);
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
