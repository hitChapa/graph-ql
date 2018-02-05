import {assert} from 'chai'
import {mergeAPIResp, mergeParentArg} from './utils'

describe('utils', () => {
  it('should test mergeParentArg', () => {
    const actual = mergeParentArg({a: 1}, {b: 1})
    const expected = {b: 1, reqArgs: {a: 1}}
    assert.deepEqual(actual, expected)
  })

  it('should test mergeAPIResp', () => {
    const actual = mergeAPIResp({a: 1}, {b: 1})
    const expected = {
      _apiResponse: {
        a: 1
      },
      b: 1
    }
    assert.deepEqual(actual, expected)
  })
})
