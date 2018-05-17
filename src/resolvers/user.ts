import * as DataLoader from 'dataloader'
import * as R from 'ramda'
import {mergeAPIResp, mergeParentArg} from '../lib/utils'
import {accountJSON} from './account'

export const createParser = R.converge(mergeAPIResp, [
  mergeParentArg,
  R.compose(R.path(['user', 'UserInfo']), R.nthArg(1))
])

export const getParsedUserResp = (args, request) => {
  return request.loader.userLoader
    .load(JSON.stringify(args))
    .then(createParser(args))
}

export const userJson = {
  zipcode: R.composeP(R.tap(console.log), R.prop('Zipcode'), R.tap(console.log), getParsedUserResp),
  address: R.composeP(R.prop('Address'), getParsedUserResp),
  emailId: R.composeP(R.prop('EmailId'), getParsedUserResp),
  id: R.composeP(R.prop('UserId'), getParsedUserResp),
  mobileNumber: R.composeP(R.prop('MobileNum'), getParsedUserResp),
  name: R.composeP(R.prop('UserFullName'), getParsedUserResp),
  city: R.composeP(R.prop('City'), getParsedUserResp),
  gender: R.composeP(
    R.ifElse(
      R.compose(Boolean, R.prop('Gender')),
      R.compose(R.toUpper, R.prop('Gender')),
      R.always(null)
    ),
    getParsedUserResp
  ),
  account: accountJSON
}

export const userLoader = (io, request) =>
  new DataLoader(
    async args =>
      await args.map(arg =>
        io.HTTP.post(
          '/v2/5a748f082d0000890bfe1058',
          R.merge({service: 'TOUR'}, request.headers),
          JSON.parse(arg as any)
        )
      )
  )

export const userResolver = R.applySpec(userJson)
