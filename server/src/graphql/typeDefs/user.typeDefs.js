const gql = require("graphql-tag");

module.exports = gql`
  type Wallet {
    _id: ID!
    userId: ID!
    balance: Float
    currency: String
    createdAt: String
    updatedAt: String
  }
  extend type User {
    wallet: Wallet
  }
  extend type Query {
    getUserProfile: User
  }
  extend type Mutation {
    requestResetPassword(email: String!): SuccessResponse
    updateUserName(name: String!): UpdateUserResponse
    deleteUser: SuccessResponse
  }
`;
