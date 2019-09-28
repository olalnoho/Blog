const getUserId = require('../utils/getUserId')

const postQuery = {
   async getPost(parent, { id }, { db, req }, info) {
      const post = await db('posts')
         .select('*')
         .where({ id })

      if (!post.length) {
         throw new Error('Post does not exists')
      }

      return post[0]
   },

   async getPosts(parent, args, { db, req }, info) {
      const totalPosts = await db('posts').count('')
      const posts = await db('posts')
         .select('*')
         .orderBy('created_at', 'desc')
         .limit(args.limit)
         .offset(args.offset)
      return {
         posts,
         count: totalPosts[0].count
      }
   },
}

const postMutation = {
   async createPost(parent, { data }, { db, req }, info) {
      const userId = getUserId(req)

      try {
         const post = await db('posts').insert({
            ...data,
            author: userId
         }).returning('*')

         return post[0]

      } catch (err) {
         if (err.code === '45000') {
            throw new Error('Only admins can create posts')
         } else {
            console.log(err)
            throw new Error('Something unexpected went wrong')
         }
      }
   },

   async updatePost(parent, { id, data }, { db, req }, info) {
      const userId = getUserId(req)
      const post = await db('posts')
         .update(data)
         .where({ id, author: userId })
         .returning('*')

      if (!post.length) {
         throw new Error('Post does not exist')
      }

      return post[0]
   },

   async deletePost(parent, { id }, { db, req }, info) {
      const userId = getUserId(req)
      const post = await db('posts')
         .delete()
         .where({ id, author: userId })
         .returning('*')

      if (!post.length) {
         throw new Error('Post does not exist')
      }

      return post[0]
   }
}

module.exports = {
   postMutation,
   postQuery
}