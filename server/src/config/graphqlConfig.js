const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('../graphql');

const createApolloGraphQL = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start();
  return server;
};

module.exports = createApolloGraphQL;
