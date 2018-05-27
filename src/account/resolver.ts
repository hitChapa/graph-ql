/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {accountJson} from './mapper'

export const accountResolver = R.applySpec(accountJson)
