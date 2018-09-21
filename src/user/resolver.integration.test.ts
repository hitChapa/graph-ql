/**
 * Created by hitesh.c on 13/06/18.
 */
const axios = require('axios')

// describe('Resolve User', () => {
test('should test user', async () => {
  const actual = await axios.post(
    'http://localhost:9900/graphql',
    {
      query:
        'query userQuery($id: Int!, $accountId: Int!) { user(id: $id) { id zipcode address emailId mobileNumber name city gender account(accountId: $accountId) { accountNumber IFSCCode } } }',
      variables: {id: 123, accountId: 123}
    },
    {'Content-Type': 'application/json'}
  )
  expect(actual).toMatchSnapshot()
})
// })
