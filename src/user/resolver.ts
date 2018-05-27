/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {userJson} from './mapper'

export const userResolver = R.applySpec(userJson)
