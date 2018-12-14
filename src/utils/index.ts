/**
 * Created by hitesh.c on 05/12/18.
 */
import * as R from 'ramda'
export const mergeParentArg = R.set(R.lensProp('reqArgs'))
export const mergeAPIResp = R.set(R.lensProp('_apiResponse'))

export const convertParser = parser => (...args) => parser(...args)