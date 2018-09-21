/**
 * Created by hitesh.c on 26/07/18.
 */
import * as R from 'ramda'

export const bankParser = R.compose(R.flatten, R.map(R.prop('options')), R.filter(R.propEq('title', 'NetBanking')), R.path(['response', 'paygateways']))
