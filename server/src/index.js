require("dotenv").config();
require("./config/connection.mongoose")

const express = require("express");
const { json } = require("express");
const cors = require("cors");


const createApolloGraphQL = require("./config/graphql/graphqlConfig");
const { expressMiddleware } = require('@apollo/server/express4');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("✅ Node.js server is up and running!");
});

(async () => {
  const apolloServer = await createApolloGraphQL();

  app.use(
    '/graphql',
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({})
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 GraphQL running at http://localhost:${PORT}/graphql`);
    console.log(`🟢 Health check at http://localhost:${PORT}/`);
  });
})();
