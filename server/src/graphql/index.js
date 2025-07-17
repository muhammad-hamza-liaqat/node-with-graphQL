const authTypeDefs = require("./typeDefs/auth.typeDefs");
const userTypeDefs = require("./typeDefs/user.typeDefs");

const authResolvers = require("./resolvers/auth.resolvers");
const userResolvers = require("./resolvers/user.resolvers")

module.exports = {
  typeDefs: [authTypeDefs, userTypeDefs],
  resolvers: [authResolvers, userResolvers],
};
