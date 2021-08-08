const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { User_game } = require("../models");

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "secretsamitoken",
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    await User_game.findOne({ where: { username: payload.username } })
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
