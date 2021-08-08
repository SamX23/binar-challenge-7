const restrict = require("./restrict");
const redirect = require("./redirect");
const tokenCheck = require("./tokenCheck");
const loginToken = require("./loginToken");
const adminOnly = require("./adminOnly");

module.exports = {
  restrict,
  redirect,
  tokenCheck,
  loginToken,
  adminOnly,
};
