/**
 * Created by hitesh.c on 18/11/17.
 */
import bodyParser = require('body-parser')
import config = require('config')
import express = require('express')
import R = require('ramda')
const cors = require('cors')
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express'
import {makeExecutableSchema, mergeSchemas} from 'graphql-tools'
import {accountLoaders, accountSchema} from './src/account/index'
import {userLoaders, userSchema} from './src/user/index'
import {http} from './src/lib/request'
import {userResolver} from './src/user/resolver'
import {accountResolver} from './src/account/resolver'
import {mergeTypes} from 'merge-graphql-schemas'

const app = express()

app.use(cors({credentials: true, origin: true}))
const typeDefs = mergeTypes([userSchema, accountSchema])

console.log('typeDefs', typeDefs)

const Schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: {
    Query: {
      user: userResolver,
      account: accountResolver
    }
  }
})
app.use(bodyParser.json())
app.use(
  '/graphql',
  graphqlExpress(request => {
    const loader = R.applySpec(R.mergeAll([userLoaders, accountLoaders]))({HTTP: http}, request)
    const _request = R.merge({loader: loader}, request)
    return {
      schema: Schema,
      // formatError: formatError,
      context: _request
    }
  })
)

app.get('/health', (request: any, response: any) => {
  return response.json({status: 'Success'})
})
app.use('/health', graphiqlExpress({endpointURL: '/health'}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))

app.listen(config.port)
