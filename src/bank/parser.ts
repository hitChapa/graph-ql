/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {mergeAPIResp} from '../lib/utils'

export const createAccountParser = R.converge(mergeAPIResp, [
  R.nthArg(1),
  R.nthArg(1)
])
