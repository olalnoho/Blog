const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const getUserId = require('../utils/getUserId')

const userQuery = {
   async getUser(parent, { id }, { db }, info) {
      const user = await db('users').select('*').where({ id })
      if (!user.length) {
         throw new Error('User not founf')
      }
      return user[0]
   },
   async me(parent, { data }, { db, req }, info) {
      const userId = getUserId(req)
      const user = await db('users').select('*').where({ id: userId })
      return user[0]
   }
}

const userMutation = {
   async createUser(parent, { data }, { db }, info) {

      const userExists = await db('users').select('*').where({username: data.username})

      if(userExists.length) {
         throw new Error('Username taken')
      }
      
      data.password = await bcrypt.hash(data.password, 10)
      const user = await db('users')
         .insert(data)
         .returning('*')

      return {
         user: user[0],
         token: generateToken(user[0].id)
      }
   },

   async updateUser(parent, { id, data }, { db }, info) {
      if (data.password) {
         data.password = await bcrypt.hash(data.password, 10)
      }
      const user = await db('users')
         .update(data)
         .returning('*')

      return user[0]
   },

   async deleteUser(parent, { id }, { db }, info) {
      const user = await db('users')
         .delete()
         .where({ id })
         .returning('*')

      if (!user.length) {
         throw new Error('User does not exist')
      }

      return user[0]
   },

   async login(parent, { data }, { db }, info) {
      const user = await db('users')
         .select('*')
         .where({ username: data.username })

      if (!user.length) {
         throw new Error('Invalid Credentials')
      }

      const isMatch = await bcrypt.compare(data.password, user[0].password)

      if (!isMatch) {
         throw new Error('Invalid Credentials')
      }

      return {
         user: user[0],
         token: generateToken(user[0].id)
      }
   },
}

module.exports = {
   userQuery,
   userMutation
}