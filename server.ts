/**
 * Created by hitesh.c on 18/11/17.
 */
import bodyParser = require('body-parser')
import config = require('config')
import express = require('express')

const cors = require('cors')
import {graphiqlExpress, graphqlExpress} from 'apollo-server-express'
import * as R from 'ramda'
import {http} from './src/lib/request'
import {MockedSchema, Schema} from './src/lib/schema-loader'
import {userAccountLoader} from './src/resolvers/account'
import {userLoader} from './src/resolvers/user'

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
  userAccountLoader: userAccountLoader,
  userLoader: userLoader
})

app.use(
  '/graphql',
  graphqlExpress(request => {
    const loader = createLoader({HTTP: http}, request)
    const _request = R.merge({loader: loader}, request)
    return {
      schema: Schema,
      formatError: formatError,
      context: _request
    }
  })
)

app.use(
  '/graphql-mock',
  graphqlExpress({
    schema: MockedSchema
  })
)

app.get('/health', (request: any, response: any) => {
  return response.json({status: 'Success'})
})

app.use('/health', graphiqlExpress({endpointURL: '/health'}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))

app.listen(config.port)
