/**
 * Created by hitesh.c on 21/05/18.
 */
import DataLoader = require('dataloader')
import * as R from 'ramda'

export const bankLoader = (io, request) =>
  new DataLoader(async args =>
    Promise.all(
      await args.map(arg =>
        io.HTTP.post(
          '/v2/5b07d84a3200004b00700076',
          R.merge({service: 'TOUR'}, request.headers),
          JSON.parse(arg as any)
        )
      )
    )
  )
