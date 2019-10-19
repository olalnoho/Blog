const { gql } = require('apollo-server-express')

module.exports = gql`

   type Post {
      id: ID!
      title: String
      content: String
      created_at: String!
      updated_at: String
      author: User!
      tags: [String!]!
      comments: [Comment!]!
   }

   input createPostInput {
      title: String
      content: String
      tags: [String!]
   }

   input updatePostInput {
      title: String
      content: String
   }

   type AllPost {
      posts: [Post!]!
      count: Int!
   }

   type CountAndTag {
      count: Int!
      tag: String!
   }

   extend type Query {
      getPost(id: ID!): Post!
      getPosts(limit: Int, offset: Int): [Post]!
      numberOfPosts: Int!
      getMostUsedTags: [CountAndTag!]!
   }
   
   extend type Mutation {
      createPost(data: createPostInput): Post!
      updatePost(id: ID! data: updatePostInput): Post!
      deletePost(id: ID!): Post!
   }
`