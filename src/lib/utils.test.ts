import {mergeAPIResp, mergeParentArg} from './utils'

describe('utils', () => {
  test('should test mergeParentArg', () => {
    const actual = mergeParentArg({a: 1}, {b: 1})
    const expected = {b: 1, reqArgs: {a: 1}}
    expect(actual).toEqual(expected)
  })

  test('should test mergeAPIResp', () => {
    const actual = mergeAPIResp({a: 1}, {b: 1})
    const expected = {
      _apiResponse: {
        a: 1
      },
      b: 1
    }
    expect(actual).toEqual(expected)
  })
})
