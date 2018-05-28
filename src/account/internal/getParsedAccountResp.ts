/**
 * Created by hitesh.c on 22/05/18.
 */
import * as R from 'ramda'
import {createAccountParser} from '../parser'

export const getParsedAccountResp = R.curry(
  (parentData, parentArgs, parentRequest, parentInfo, args, request) =>
    parentRequest.loader.userAccountLoader
      .load(JSON.stringify(parentArgs))
      .then(createAccountParser(parentArgs))
)
