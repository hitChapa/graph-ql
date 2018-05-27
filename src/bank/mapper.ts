/**
 * Created by hitesh.c on 21/05/18.
 */

import R = require('ramda')
import {convertParser} from '../lib/utils'
import {getParsedBankResp} from './internal/getParsedBankResp'
const getBank = convertParser(getParsedBankResp)

const name = (...args) => R.composeP(R.path(['bankName']), getBank(...args))

export const bankJson = {
  name
}
