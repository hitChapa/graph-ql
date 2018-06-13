/**
 * Created by hitesh.c on 13/06/18.
 */

// import config = require('config')
import express = require('express')
const app = express()
const mockUser = require('../../fixtures/user.json')
const mockAccount = require('../../fixtures/account.json')

app.post('/v2/5a748f082d0000890bfe1058', (request: any, response: any) => {
  return response.status(200).json(mockUser)
})

app.post('/v2/5af2d61a3400006600770259', (request: any, response: any) => {
  return response.status(200).json(mockAccount)
})

app.listen(9002)