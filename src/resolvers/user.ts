import * as R from 'ramda'
import {HttpIO} from '../lib/request'
import {mergeAPIResp, mergeParentArg} from '../lib/utils'

type UserIO = {HTTP: HttpIO}

interface UserArgs {}

/**
 * Used to map converted api data
 */
export const User = R.applySpec({
  zipcode: R.prop('Zipcode'),
  address: R.prop('Address'),
  emailId: R.prop('EmailId'),
  id: R.prop('UserId'),
  mobileNumber: R.prop('MobileNum'),
  name: R.prop('UserFullName'),
  city: R.prop('City'),
  gender: R.ifElse(
    R.compose(Boolean, R.prop('Gender')),
    R.compose(R.toUpper, R.prop('Gender')),
    R.always(null)
  )
})

/**
 * Used to convert an api response
 */
export const createParser =
  R.converge(R.compose(User, mergeAPIResp), [
    mergeParentArg,
    R.compose(R.path(['user', 'UserInfo']), R.nthArg(1))
  ])


/**
 * Used to fetch data from API
 */
export const fetchUser = R.curry(
  (io: UserIO, args: UserArgs, request: Request) =>
    io.HTTP.post('/v2/5a748f082d0000890bfe1058', request.headers, args)
)

/**
 * User Resolver,
 * 1) Fetch User data from API
 * 2) Convert API response in required format
 * 3) Map converted response and return output
 */
export const userResolver = (io: UserIO) => (
  current: Object,
  args: Object,
  request: Request
) => fetchUser(io, args, request).then(createParser(args))
