const { gql } = require('apollo-server-express')

module.exports = gql`
   type Comment {
      id: ID!
      content: String!
      name: String
      author: User
      post: Post!
      created_at: String!
      updated_at: String
   }

   input createCommentInput {
      content: String!
      name: String
   }

   input updateCommentInput {
      content: String!
   }

   extend type Query {
      getComment(id: ID!): Comment!
      getPostComments(id: ID!): [Comment!]!
   }
   extend type Mutation {
      createComment(postId: ID! data: createCommentInput!): Comment!
      updateComment(id: ID! data: updateCommentInput): Comment!
      deleteComment(id: ID!): Comment!
   }
`