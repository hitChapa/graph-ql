/**
 * Created by hitesh.c on 04/12/18.
 */
import bodyParser = require('body-parser')
import express = require('express')

const cors = require('cors')
import {graphqlExpress} from 'apollo-server-express'
import config = require('config')
import {http} from 'gql-request'
import {makeExecutableSchema} from 'graphql-tools'
import {fileLoader, mergeTypes} from 'merge-graphql-schemas'
import * as path from 'path'
import * as R from 'ramda'
import {accountLoader} from './loader'
import {accountResolver} from './resolver'
const app = express()

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

const createLoader = R.applySpec({
  userAccountLoader: accountLoader
})

export const accountLoaders = {
  userAccountLoader: accountLoader
}

export const accountSchemaString = fileLoader(path.join(__dirname, 'schema'))
export const accountSchema = mergeTypes(accountSchemaString)

export const accountExecutableSchema = makeExecutableSchema({
  typeDefs: [accountSchema],
  resolvers: {
    Query: {
      account: accountResolver
    }
  }
})

export const Account = graphqlExpress(request => {
  const loader = createLoader({HTTP: http(config)}, request)
  const _request = R.merge({loader: loader}, request)
  return {
    schema: accountExecutableSchema,
    formatError: formatError,
    context: _request
  }
})

// app.use('/health', graphiqlExpress({endpointURL: '/health'}))
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
// app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))
//
// app.listen(config.port)
