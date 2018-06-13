const axios = require('axios')

const gqlQuery = 'query userQuery { user(id: 123) { id zipcode address emailId mobileNumber name city gender } }'
const getData = () => {
  axios.post(
    'http://localhost:9901/graphql',
    {query: gqlQuery, variables: null},
    {'Content-Type': 'application/json'}
  )
    .then(data => console.log(data.data))
    .catch(console.log)
}

getData()