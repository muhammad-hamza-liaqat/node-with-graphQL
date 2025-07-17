const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { printSchema } = require('graphql');

const authTypeDefs = require("./typeDefs/auth.typeDefs");
const userTypeDefs = require("./typeDefs/user.typeDefs");

const authResolvers = require("./resolvers/auth.resolvers");
const userResolvers = require("./resolvers/user.resolvers");

const schema = makeExecutableSchema({
  typeDefs: [authTypeDefs, userTypeDefs],
  resolvers: [authResolvers, userResolvers],
});

// console.log(printSchema(schema));

module.exports = schema;
