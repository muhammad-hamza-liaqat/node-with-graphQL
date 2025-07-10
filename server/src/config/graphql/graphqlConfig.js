const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    hamza: String
  }
`;

const resolvers = {
  Query: {
    hamza: () => 'Hello, From Hamza GraphQL Server!',
  },
};

const createApolloGraphQL = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  return server;
};

module.exports = createApolloGraphQL;
