const path = require('path')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')

const db = require('./db/db')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const app = express()
app.disable('x-powered-by')

const server = new ApolloServer({
   playground: false,
   typeDefs,
   resolvers,
   context: req => ({
      ...req,
      db,
   })
})

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(
         __dirname, 'client', 'build', 'index.html'
      ))
   })
}

server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 4000 })