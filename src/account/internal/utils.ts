/**
 * Created by hitesh.c on 29/05/18.
 */

import {convertParser} from 'gql-utility'
import R = require('ramda')
import {getParsedAccountResp} from './getParsedAccountResp'

const getAccount = convertParser(getParsedAccountResp)

export const IFSCCode = (...args) =>
  R.composeP(R.path(['ifscCode']), getAccount(...args))
export const bankName = (...args) =>
  R.composeP(R.path(['bankName']), getAccount(...args))
export const zipcode = (...args) =>
  R.composeP(R.path(['zipCode']), getAccount(...args))
export const accountNumber = (...args) =>
  R.composeP(R.prop('accountNumber'), getAccount(...args))
