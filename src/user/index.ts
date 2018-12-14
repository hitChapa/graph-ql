/**
 * Created by hitesh.c on 04/12/18.
 */
import bodyParser = require('body-parser')
import express = require('express')

const cors = require('cors')
import {graphqlExpress} from 'apollo-server-express'
import {http} from 'gql-request'
import {makeExecutableSchema} from 'graphql-tools'
import {fileLoader, mergeTypes} from 'merge-graphql-schemas'
import * as path from 'path'
import * as R from 'ramda'
import {userLoader} from './loader'
import {userResolver} from './resolver'
const app = express()
import config = require('config')
import {accountLoaders, accountSchema} from 'gql-test-account'

interface GraphQLErrorType {
  message: string
  path: string
  status: string
  originalError: Object
}

/**
 * used to format error forwarded from API
 * @param {Error} error
 * @return {Object}
 */
const formatError = (error: GraphQLErrorType) => {
  const apiError: any = error.originalError
  if (!apiError) {
    return error
  }
  try {
    return {
      message: JSON.parse(apiError.error).error.MsgText,
      error: JSON.parse(apiError.error).error,
      path: error.path,
      status: apiError.statusCode
    }
  } catch (r) {
    return {
      message: apiError.message,
      error: [],
      path: error.path,
      status: apiError.statusCode
    }
  }
}

app.use(cors({credentials: true, origin: true}))

app.use(bodyParser.json())

export const userLoaders = {
  userLoader: userLoader
}

export const userSchemaString = fileLoader(path.join(__dirname, 'schema'))
export const userSchema = mergeTypes([userSchemaString[0], accountSchema])
// console.log('userSchema', userSchema)

export const UserExecutableSchema = makeExecutableSchema({
  typeDefs: [userSchema],
  resolvers: {
    Query: {
      user: userResolver
    }
  }
})

export const User = graphqlExpress(request => {
  const loader = R.applySpec(R.mergeAll([userLoaders, accountLoaders]))({HTTP: http(config)}, request)
  const _request = R.merge({loader: loader}, request)
  return {
    schema: UserExecutableSchema,
    formatError: formatError,
    context: _request
  }
})

// app.use('/health', graphiqlExpress({endpointURL: '/health'}))
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
// app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))
//
// app.listen(config.port)
