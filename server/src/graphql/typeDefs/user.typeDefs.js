const gql = require("graphql-tag");

module.exports = gql`
  extend type Mutation {
    requestResetPassword(email: String!): SuccessResponse
  }
`;
