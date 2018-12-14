/**
 * Created by hitesh.c on 21/05/18.
 */
import {mergeAPIResp} from 'gql-utility'
import * as R from 'ramda'

export const createUserParser = R.converge(mergeAPIResp, [
  R.nthArg(1),
  R.compose(R.path(['user', 'UserInfo']), R.nthArg(1))
])
