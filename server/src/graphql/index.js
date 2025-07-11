const authTypeDefs = require("./typeDefs/auth.typeDefs");
const authResolvers = require("./resolvers/auth.resolvers");

module.exports = {
  typeDefs: [authTypeDefs],
  resolvers: [authResolvers],
};
