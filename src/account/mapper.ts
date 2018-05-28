/**
 * Created by hitesh.c on 21/05/18.
 */

import R = require('ramda')
import {bankResolver} from '../bank/resolver'
import {convertParser} from '../lib/utils'
import {getParsedAccountResp} from './internal/getParsedAccountResp'
const getAccount = convertParser(getParsedAccountResp)

const IFSCCode = (...args) =>
  R.composeP(R.path(['ifscCode']), getAccount(...args))
const bankName = (...args) =>
  R.composeP(R.path(['bankName']), getAccount(...args))
const zipcode = (...args) =>
  R.composeP(R.path(['zipCode']), getAccount(...args))
const accountNumber = (...args) =>
  R.composeP(R.prop('accountNumber'), getAccount(...args))

export const accountJson = {
  IFSCCode,
  bankName,
  zipcode,
  accountNumber,
  bank: (a, b, c, d) => (args, resp) => {
    const newArgs = R.merge(b, args)
    return bankResolver(a, newArgs, c, d)
  }
}
