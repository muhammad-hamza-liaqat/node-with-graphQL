const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");

const isAuthenticated = (resolver) => {
  return (parent, args, context, info) => {
    const authHeader = context.req?.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Authorization token must be provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("user decoded from JWT --->", decoded);
      context.user = decoded;
      return resolver(parent, args, context, info);
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
  };
};

module.exports = { isAuthenticated };
