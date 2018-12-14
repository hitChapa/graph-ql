/**
 * Created by hitesh.c on 18/11/17.
 */
import bodyParser = require('body-parser')
import config = require('config')
import express = require('express')
const cors = require('cors')
import {graphiqlExpress} from 'apollo-server-express'
import {User} from './src/user/index'

const app = express()

app.use(cors({credentials: true, origin: true}))

app.use(bodyParser.json())
app.use(
  '/graphql',
  User
)

app.get('/health', (request: any, response: any) => {
  return response.json({status: 'Success'})
})
app.use('/health', graphiqlExpress({endpointURL: '/health'}))
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
app.use('/graphiql-mock', graphiqlExpress({endpointURL: '/graphql-mock'}))

app.listen(config.port)
