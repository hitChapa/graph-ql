import * as DataLoader from 'dataloader'
import * as R from 'ramda'
import {mergeAPIResp, mergeParentArg, wrapperFunc} from '../lib/utils'

/**
 * Used to convert an api response
 */
export const createParser = R.converge(mergeAPIResp, [
  mergeParentArg,
  R.nthArg(1)
])

export const userAccountLoader = (io, request) =>
  new DataLoader(
    async args =>
      await args.map(arg =>
        io.HTTP.post(
          '/v2/5af2d61a3400006600770259',
          R.merge({service: 'TOUR'}, request.headers),
          JSON.parse(arg as any)
        )
      )
  )

const getParsedResp = (args, request) => {
  return request.loader.userAccountLoader
    .load(JSON.stringify(args))
    .then(createParser(args))
}

export const accountJSON = {
  IFSCCode: wrapperFunc(R.prop('ifscCode'), getParsedResp),
  bankName: wrapperFunc(R.prop('bankName'), getParsedResp),
  zipcode: wrapperFunc(R.prop('zipCode'), getParsedResp),
  accountNumber: wrapperFunc(R.prop('accountNumber'), getParsedResp)
}

export const accountResolver = R.applySpec(accountJSON)
