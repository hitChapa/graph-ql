/**
 * Created by hitesh.c on 21/05/18.
 */
import {mergeAPIResp} from 'gql-utility'
import * as R from 'ramda'

export const createAccountParser = R.converge(mergeAPIResp, [
  R.nthArg(1),
  R.nthArg(1)
])
