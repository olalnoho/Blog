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

server.applyMiddleware({ app })

app.listen({ port: 4000 })