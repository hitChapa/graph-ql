/**
 * Created by hitesh.c on 28/05/18.
 */

import * as accountMock from './../../fixtures/account.json';
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

  test('should test userId', async () => {
    const userId = await userResolver({}, {}, mockedRequest, {}).id({}, {})
    expect(userId).toEqual(123123123)
  })

  test('should test account.accountNumner', async () => {
    const account = await userResolver({}, {}, mockedRequest, {}).account(
      {},
      {}
    )
    const accountNum = await account.accountNumber({}, {})
    expect(accountNum).toEqual('ACC909983HHH')
  })
})
