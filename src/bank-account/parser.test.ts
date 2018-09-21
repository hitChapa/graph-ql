/**
 * Created by hitesh.c on 26/07/18.
 */
import {assert} from 'chai'
import * as mockBank from './bankMock.json'
import {bankParser} from './parser'
describe('bank parser test', () => {
  it('should resolve bankParser', () => {
    const actual = bankParser(mockBank)
    assert.deepEqual(actual, [
      {
        id: 37,
        PayType: 'NetBanking',
        PayOption: 'State Bank of India'
      },
      {
        id: 8,
        PayType: 'NetBanking',
        PayOption: 'AXIS Bank'
      }
    ])
  })
})
