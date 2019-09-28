const { userQuery, userMutation } = require('./user')
const { postQuery, postMutation } = require('./post')
const { commentQuery, commentMutation } = require('./comment')

module.exports = {
   Query: {
      ...userQuery,
      ...postQuery,
      ...commentQuery
   },
   Mutation: {
      ...userMutation,
      ...postMutation,
      ...commentMutation
   },

   User: {
      posts(parent, args, { db }, info) {
         return db('posts')
            .select('*')
            .where({ author: parent.id })
      },
      comments(parent, args, { db }, info) {
         return db('comments')
            .select('*')
            .where({ author: parent.id })
      },
   },
   Post: {
      comments(parent, args, { db }, info) {
         return db('comments')
            .select('*')
            .where({ post: parent.id })
      },
      async author(parent, args, { db }, info) {
         const user = await db('users')
            .select('*')
            .where({ id: parent.author })

         return user[0]
      }
   },

   Comment: {
      async author(parent, args, { db }, info) {
         const user = await db('users')
            .select('*')
            .where({ id: parent.author })

         return user[0]
      }
   }
}