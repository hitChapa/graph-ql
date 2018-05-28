/**
 * Created by hitesh.c on 28/05/18.
 */

import {assert} from 'chai'
import * as accountMock from './../../fixtures/account.json'
import * as userMock from './../../fixtures/user.json'
import {userResolver} from './resolver'

describe('UserResolver', () => {
  const mockedRequest = {
    loader: {
      userLoader: {
        load: () => Promise.resolve(userMock)
      },
      userAccountLoader: {
        load: () => Promise.resolve(accountMock)
      }
    }
  }

  it('should test userId', async () => {
    const userId = await userResolver({}, {}, mockedRequest, {}).id({}, {})
    assert.equal(userId, 123123123)
  })

  it('should test account.accountNumner', async () => {
    const account = await userResolver({}, {}, mockedRequest, {}).account(
      {},
      {}
    )
    const accountNum = await account.accountNumber({}, {})
    assert.equal(accountNum, 'ACC909983HHH')
  })
})
