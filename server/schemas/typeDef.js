const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
   authors: String
   description: String
   bookId: String
   image: String
   link: String
   title: String
  }

  type User {
      username: String
      email: String
      password: String
      savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    getSingleUser(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(username:String!,bookId:String!)User
    deleteBook(username:String!,bookId:String!)User
  }

`;
module.exports = typeDefs;  