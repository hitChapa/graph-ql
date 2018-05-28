/**
 * Created by hitesh.c on 18/11/17.
 */

import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools'
import {fileLoader, mergeTypes} from 'merge-graphql-schemas'
import * as path from 'path'
import {accountResolver} from '../account/resolver'
import {bankResolver} from '../bank/resolver'
import {userResolver} from '../user/resolver'
import {MockMutations, MockQuery} from './mock-data'

/**
 * The path for the schema files
 * @type {string}
 */
export const ROOT_SCHEMA_PATH = path.resolve(__dirname, '../schemas')

/**
 * Load definitions
 */
export const TypeDefinition = mergeTypes(fileLoader(ROOT_SCHEMA_PATH))

/**
 * Load resolvers
 */
export const resolvers = {
  Query: {
    user: userResolver,
    account: accountResolver,
    bank: bankResolver
  }
}

/**
 * The deserialized version of the Graphql schema
 */
export const Schema = makeExecutableSchema({
  typeDefs: [TypeDefinition],
  resolvers: resolvers
})

/**
 * Contains automocked schema
 */
export const MockedSchema = makeExecutableSchema({
  typeDefs: [TypeDefinition],
  resolvers
})

const mocks = {
  Date: () => new Date(),
  Query: MockQuery,
  Mutation: MockMutations
}

addMockFunctionsToSchema({schema: MockedSchema, mocks})
