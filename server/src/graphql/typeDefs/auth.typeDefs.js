const gql = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type SuccessResponse {
    message: String!
  }

  type UpdateUserResponse {
    message: String!
    user: User!
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    signup(input: SignupInput!): SuccessResponse
    login(input: LoginInput!): AuthResponse!
  }
`;
