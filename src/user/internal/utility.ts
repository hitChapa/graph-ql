/**
 * Created by hitesh.c on 29/05/18.
 */
// import {accountResolver} from '../../account/resolver'
import {accountResolver} from 'gql-test-account/resolver'
import {convertParser} from 'gql-utility'
import * as R from 'ramda'
import {getParsedUserResp} from './getParsedUserResp'

const getUser = convertParser(getParsedUserResp)

export const id = (...args) => R.composeP(R.path(['UserId']), getUser(...args))

export const zipcode = (...args) =>
  R.composeP(R.path(['Zipcode']), getUser(...args))
export const emailId = (...args) =>
  R.composeP(R.path(['EmailId']), getUser(...args))
export const address = (...args) =>
  R.composeP(R.path(['Address']), getUser(...args))
export const mobileNumber = (...args) =>
  R.composeP(R.path(['Zipcode']), getUser(...args))
export const name = (...args) =>
  R.composeP(R.path(['UserFullName']), getUser(...args))
export const city = (...args) => R.composeP(R.path(['City']), getUser(...args))
export const gender = (...args) =>
  R.composeP(
    R.ifElse(
      R.compose(Boolean, R.prop('Gender')),
      R.compose(R.toUpper, R.prop('Gender')),
      R.always(null)
    ),
    getUser(...args)
  )
export const userAccount = (a, b, c, d) => async (args, resp) => {
  const userId = await id(a, b, c, d)({}, resp)
  const newArgs = R.merge(R.merge(args, b), {userId: userId})
  return accountResolver(a, newArgs, c, d)
}
