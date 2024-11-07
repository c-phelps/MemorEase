const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  // auth middleware for retrieving and verifying users
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    //   find auth in the headers and split from "bearer  token"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
    //   if token exists, decode and return the user as the username
    try {
      const { username } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = username;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
