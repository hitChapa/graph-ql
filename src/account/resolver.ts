/**
 * Created by hitesh.c on 21/05/18.
 */
import * as R from 'ramda'
import {accountJson} from './mapper'

// const getName = () =>

export const accountResolver = R.applySpec({
  accountNumber: (a, b) => {
    console.log('accountNumber', a, b)
    return R.always(123)
  },
  IFSCCode: () => {
    console.log('IFSCCode')
    return Promise.resolve('12312312')
  },
  bankName: () => (a, b) => {
    console.log('bankName', a, b)
    return 'harsh'
  }
  // bank: () => (a, b) => {
  //   console.log('bank', a, b)
  //   return {id: 123}
  // }
})
