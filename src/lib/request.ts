import axios from 'axios'
import * as config from 'config'
import * as R from 'ramda'

const post = (url: string, headers: Object, body) => {
  console.log(new Date().toISOString(), '**** Request ****', url, body) // tslint:disable-line no-console
  return axios.post(`${config.api}${url}`, {}, body).then(R.prop('data'))
}

export const http = {
  post: post
}

export type HttpIO = typeof http
