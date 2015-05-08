var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

exports.setup = function (User, config) {
  passport.use(new GithubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({
        'github.id': profile._json.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            name: profile.username,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            avatar: profile._json.avatar_url,
            provider: 'github',
            github: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      })
    }
  ));

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
};

/*
{ login: 'nadbm',
     id: 5846191,
     avatar_url: 'https://avatars.githubusercontent.com/u/5846191?v=3',
     gravatar_id: '',
     url: 'https://api.github.com/users/nadbm',
     html_url: 'https://github.com/nadbm',
     followers_url: 'https://api.github.com/users/nadbm/followers',
     following_url: 'https://api.github.com/users/nadbm/following{/other_user}',
     gists_url: 'https://api.github.com/users/nadbm/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/nadbm/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/nadbm/subscriptions',
     organizations_url: 'https://api.github.com/users/nadbm/orgs',
     repos_url: 'https://api.github.com/users/nadbm/repos',
     events_url: 'https://api.github.com/users/nadbm/events{/privacy}',
     received_events_url: 'https://api.github.com/users/nadbm/received_events',
     type: 'User',
     site_admin: false,
     public_repos: 7,
     public_gists: 0,
     followers: 2,
     following: 2,
     created_at: '2013-11-03T22:16:13Z',
     updated_at: '2015-02-15T07:00:25Z' } }


*/