/**
 * Created by hitesh.c on 21/05/18.
 */
import {
  address,
  city,
  emailId,
  gender,
  id,
  mobileNumber,
  name,
  userAccount,
  zipcode
} from './internal/utility'

export const userJson = {
  id,
  zipcode,
  address,
  emailId,
  mobileNumber,
  name,
  city,
  gender,
  account: userAccount
}
