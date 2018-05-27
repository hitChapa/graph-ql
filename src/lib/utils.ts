///<reference path="../../node_modules/@types/ramda/index.d.ts"/>
import * as R from 'ramda'
export const mergeParentArg = R.set(R.lensProp('reqArgs'))
export const mergeAPIResp = R.set(R.lensProp('_apiResponse'))

export const convertParser = parser => (...args) => parser(...args)
