/**
 * Created by hitesh.c on 29/05/18.
 */
import R = require('ramda')
import {convertParser} from '../../lib/utils'
import {getParsedBankResp} from './getParsedBankResp'

const getBank = convertParser(getParsedBankResp)
export const bankName = (...args) =>
  R.composeP(R.path(['bankName']), getBank(...args))
