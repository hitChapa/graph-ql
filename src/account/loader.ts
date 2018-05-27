/**
 * Created by hitesh.c on 21/05/18.
 */
import DataLoader = require('dataloader')
import * as R from 'ramda'

export const accountLoader = (io, request) =>
  new DataLoader(async args =>
    Promise.all(
      await args.map(arg =>
        io.HTTP.post(
          '/v2/5af2d61a3400006600770259',
          R.merge({service: 'TOUR'}, request.headers),
          JSON.parse(arg as any)
        )
      )
    )
  )
