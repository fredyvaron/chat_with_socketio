var express = require("express");
var passport = require("passport");
const jwt = require("jsonwebtoken");
var LocalStrategy = require("passport-local");
const {
  emailUser,
  comparePassword,
  filterUserPassword,
} = require("../services/User.service");

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", //can be 'email' or 'whateveryouwant'
      passwordField: "clave", //same thing here
    },
    async function verify(email, clave, cb) {
      try {
        const user = await emailUser(email);
        if (!user) {
          return cb(null, false, { message: "User not found" });
        }
        const validate = await comparePassword(clave, user.clave);
        if (validate === false) {
          return cb(null, false, { message: "Wrong password" });
        }
        const filter = await filterUserPassword(user);
        return cb(null, filter, { message: "Login successfull" });
      } catch (e) {
        return cb(e);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (e) {
        done(error);
      }
    }
  )
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
