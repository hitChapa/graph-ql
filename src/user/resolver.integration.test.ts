/**
 * Created by hitesh.c on 13/06/18.
 */
// import {http} from '../lib/request'

import {assert} from 'chai'
import {readFileSync} from 'fs'

const axios = require('axios')
const gqlQuery = readFileSync(__dirname + '/internal/query.graphql', 'utf8')

describe('userIntegration', () => {
  it('should test user GQL fields', async () => {
    const expected = require('./internal/expected.test.json')
    const actual = await axios.post(
      'http://localhost:9901/graphql',
      {query: gqlQuery, variables: null},
      {'Content-Type': 'application/json'}
    )
    assert.deepEqual(actual.data, expected)
  })
})
