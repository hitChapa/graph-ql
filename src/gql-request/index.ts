import axios from 'axios'
import * as R from 'ramda'

const post = (config) => (url: string, headers: Object, body) => {
  console.log(new Date().toISOString(), '**** Request ****', `${config.api}${url}`, url, body) // tslint:disable-line no-console
  return axios.post(`${config.api}${url}`, {}, body).then(R.prop('data')).then((d) => {
    console.log('got response')
    return d})
}

export const http = (config) => ({
  post: post(config)
})

export type HttpIO = typeof http
