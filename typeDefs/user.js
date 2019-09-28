const { gql } = require('apollo-server-express')

module.exports = gql`

   enum role {
      admin
      guest
   }

   type User {
      id: ID!
      username: String!
      password: String!
      role: role!
      created_at: String!
      updated_at: String
      posts: [Post!]
   }

   type Auth {
      user: User!
      token: String!
   }

   input createUserInput {
      username: String!
      password: String!
      role: role
   }

   input updateUserInput {
      username: String
      password: String
   }

   input loginInput {
      username: String!
      password: String!
   }

   extend type Query {
      me: User!,
      getUser(id: ID!): User!
   }
   
   extend type Mutation {
      createUser(data: createUserInput!): Auth!
      updateUser(id: ID! data: updateUserInput!): User!
      deleteUser(id: ID!): User!
      login(data: loginInput): Auth!
   }
`