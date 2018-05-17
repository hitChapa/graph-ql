import {assert} from 'chai'
import {createParser, userJson} from './user'

const demoUserObj = require('./../fixtures/user')

describe('User', () => {
  const args = {}
  const mockedLoaders = {
    loader: {
      userLoader: {
        load: () => Promise.resolve(demoUserObj)
      }
    }
  }

  it('should test user id', async () => {
    const actual = await userJson.zipcode(args, mockedLoaders)
    console.log('actual = ', actual)
    assert.deepEqual(actual, 123123123)
  })
  it('should test user address', () => {
    const actual = createParser(args)(demoUserObj).address
    assert.deepEqual(
      actual,
      'Google LLC. attn: Joe Grier 1600 Amphitheatre Parkway Mountain View, CA 94043 USA'
    )
  })
  it('should test user emailId', () => {
    const actual = createParser(args)(demoUserObj).emailId
    assert.deepEqual(actual, 'hit.XXXX@gmail.com')
  })
  it('should test user zipcode', () => {
    const actual = createParser(args)(demoUserObj).zipcode
    assert.deepEqual(actual, '400XXX')
  })
  it('should test user mobileNumber', () => {
    const actual = createParser(args)(demoUserObj).mobileNumber
    assert.deepEqual(actual, '9029XXXX76')
  })
  it('should test user name', () => {
    const actual = createParser(args)(demoUserObj).name
    assert.deepEqual(actual, 'Hitesh Chapanera')
  })
  it('should test user city', () => {
    const actual = createParser(args)(demoUserObj).city
    assert.deepEqual(actual, '')
  })
  it('should test user gender', () => {
    const actual = createParser(args)(demoUserObj).gender
    assert.deepEqual(actual, 'MALE')
  })
})
