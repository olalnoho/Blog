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

   async getPostsByTag(parent, { tag }, { db, req }, info) {
      const res = await db.raw(`
         SELECT 
            *
         FROM posts 
         WHERE ? = ANY(tags)
         ORDER BY created_at DESC;
      `, tag)
      return res.rows
   },

   async getPostsBySearch(parent, { query }, { db, req }, info) {
      query = `%${query}%`
      const res = await db.raw(`
         SELECT
            *
         FROM posts
         WHERE title ILIKE ? OR content ILIKE ?
         ORDER BY created_at DESC;
      `, [query, query])

      return res.rows
   },

   async getPosts(parent, args, { db, req }, info) {
      return db('posts')
         .select('*')
         .orderBy('created_at', 'desc')
         .limit(args.limit)
         .offset(args.offset)
   },

   async getMostUsedTags(parent, args, { db, req }, info) {
      const res = await db.raw(`
         SELECT 
            COUNT(*) as count,
            tag
         FROM (
            SELECT unnest(tags) as tag FROM posts
         ) as tbl
         GROUP BY tag
         ORDER BY count DESC
         LIMIT 5;
      `)

      return res.rows
   },

   async numberOfPosts(parent, args, { db }) {
      const count = await db('posts').count()
      return count[0].count
   }
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