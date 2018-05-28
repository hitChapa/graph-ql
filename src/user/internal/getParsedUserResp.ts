/**
 * Created by hitesh.c on 21/05/18.
 */
import R = require('ramda')
import {createUserParser} from '../parser'

export const getParsedUserResp = R.curry(
  (parentData, parentArgs, parentRequest, parentInfo, args, request) =>
    parentRequest.loader.userLoader
      .load(JSON.stringify(parentArgs))
      .then(createUserParser(parentArgs))
)
