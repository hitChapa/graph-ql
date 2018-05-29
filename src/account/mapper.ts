/**
 * Created by hitesh.c on 21/05/18.
 */
import {
  accountNumber,
  bankName,
  IFSCCode,
  userBank,
  zipcode
} from './internal/utils'

export const accountJson = {
  IFSCCode,
  bankName,
  zipcode,
  accountNumber,
  bank: userBank
}
