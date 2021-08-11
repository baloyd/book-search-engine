const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Book {
   authors: [String]
   description: String
   bookId: ID!
   image: String
   link: String
   title: String!
  }

  input BookInput {
    authors: [String]
   description: String!
   bookId: String!
   image: String
   link: String
   title: String!
  }

  type User {
      _id: ID!
      username: String!
      email: String
      password: String
      bookCount:Int
      savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData:BookInput!):User
    deleteBook(bookId:ID!):User
  }

`;
module.exports = typeDefs;  