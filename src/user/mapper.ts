/**
 * Created by hitesh.c on 21/05/18.
 */

import R = require('ramda')
import {accountResolver} from '../account/resolver'
import {convertParser} from '../lib/utils'
import {getParsedUserResp} from './internal/getParsedUserResp'

const getUser = convertParser(getParsedUserResp)

const id = (...args) => R.composeP(R.path(['UserId']), getUser(...args))

const zipcode = (...args) => R.composeP(R.path(['Zipcode']), getUser(...args))
const emailId = (...args) => R.composeP(R.path(['EmailId']), getUser(...args))
const address = (...args) => R.composeP(R.path(['Address']), getUser(...args))
const mobileNumber = (...args) =>
  R.composeP(R.path(['Zipcode']), getUser(...args))
const name = (...args) => R.composeP(R.path(['UserFullName']), getUser(...args))
const city = (...args) => R.composeP(R.path(['City']), getUser(...args))
const gender = (...args) =>
  R.composeP(
    R.ifElse(
      R.compose(Boolean, R.prop('Gender')),
      R.compose(R.toUpper, R.prop('Gender')),
      R.always(null)
    ),
    getUser(...args)
  )

export const userJson = {
  id,
  zipcode,
  address,
  emailId,
  mobileNumber,
  name,
  city,
  gender,
  account: (a, b, c, d) => async (args, resp) => {
    const userId = await id(a, b, c, d)({}, resp)
    const newArgs = R.merge(R.merge(args, b), {userId: userId})
    return accountResolver(a, newArgs, c, d)
  }
}
