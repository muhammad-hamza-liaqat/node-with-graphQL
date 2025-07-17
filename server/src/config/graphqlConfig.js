const { ApolloServer } = require("@apollo/server");
const schema = require("../graphql/index")

const createApolloGraphQL = async () => {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  return server;
};

module.exports = createApolloGraphQL;
