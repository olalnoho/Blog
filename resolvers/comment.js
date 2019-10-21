const getUserId = require('../utils/getUserId')

// The actual getting of comments for a post is done in resolvers/index.js
// as a sub-resolver for the getPosts query
// because there isn't any case where i'd just want to get the comments.
// without posts.

const commentQuery = {
   async getComment(parent, { id }, { db, req }, info) {
      const comments = await db('comments')
         .join('posts', 'posts.id', 'comments.post')
         .select('posts.author AS pa', 'posts.id AS pid', 'comments.id AS cid')
         .then(data => {

         })
   }
}

const commentMutation = {
   async createComment(parent, { postId, data }, { db, req }, info) {
      const userId = getUserId(req, false)
      if (!userId) {
         if (!data.name) {
            throw new Error('Name is required')
         }
         const comment = await db('comments').insert({
            post: postId,
            ...data
         }).returning('*')

         return comment[0]
      } else {
         const comment = await db('comments').insert({
            post: postId,
            author: userId,
            ...data,
         }).returning('*')

         return comment[0]
      }
   },
   async updateComment(parent, { id, data }, { db, req }, info) {
      const userId = getUserId(req)
      const comment = await db('comments')
         .update(data)
         .where({ id })
         .returning('*')

      if (!comment.length) {
         throw new Error('Comment does not exist')
      }

      if (userId !== comment[0].author) {
         throw new Error('Not authorized to edit post')
      }

      return comment[0]
   },
   async deleteComment(parent, { id }, { db, req }, info) {
      const userId = getUserId(req)
      const comment = await db('comments')
         .join('posts', 'posts.id', 'comments.post')
         .select('posts.author AS pa', 'comments.author as ca')
         .where({ 'comments.id': id })
         .then(([data]) => {
            if (data.pa === userId || data.ca === userId) {
               return db('comments').delete().where({ id }).returning('*')
            } else {
               throw new Error('Not authorized')
            }
         })

      if (!comment.length) {
         throw new Error('Comment does not exist')
      }

      return comment[0]
   }
}

module.exports = {
   commentQuery,
   commentMutation
}