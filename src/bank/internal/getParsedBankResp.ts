/**
 * Created by hitesh.c on 22/05/18.
 */
import * as R from 'ramda'
import {createAccountParser} from '../parser'

export const getParsedBankResp = R.curry(
  (parentData, parentArgs, parentRequest, parentInfo, args, request) =>
    request.loader.bankLoader
      .load(JSON.stringify(parentArgs))
      .then(createAccountParser(parentArgs))
)
