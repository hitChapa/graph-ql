/**
 * Created by hitesh.c on 26/07/18.
 */
import * as bankMock from './bankMock.json'
import {bankResolver} from './resolver'

describe('UserResolver', () => {
  const mockedRequest = {
    loader: {
      bankLoader: {
        load: () => Promise.resolve(bankMock)
      }
    }
  }

  test('should test id', async () => {
    // const id = await bankResolver({}, {}, mockedRequest, {}).id({}, {})
    expect(1).toEqual(37)
  })

  test('should test account.accountNumner', async () => {
    const account = await bankResolver({}, {}, mockedRequest, {}).account(
      {},
      {}
    )
    const accountNum = await account.accountNumber({}, {})
    expect(accountNum).toEqual('ACC909983HHH')
  })
})
