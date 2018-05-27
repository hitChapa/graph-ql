/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {bankJson} from './mapper'

export const bankResolver = R.applySpec(bankJson)
