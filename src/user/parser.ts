/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {mergeAPIResp} from '../lib/utils'

export const createUserParser = R.converge(mergeAPIResp, [
  R.nthArg(1),
  R.compose(R.path(['user', 'UserInfo']), R.nthArg(1))
])
