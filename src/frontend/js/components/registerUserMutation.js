import { commitMutation, graphql } from 'react-relay'
import { modernEnvironment } from '../app.js' 

const mutation = graphql`
  mutation registerUserMutation($input: registerUserInput!) {
    registerUser(input: $input) {
      user {
        id,
        username
      }
    }
  }
`

function commit (props, username, password, confirmPassword)  {
  console.log(this.props)
  const environment = modernEnvironment
  const router = props.router
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        username: username,
        password: password,
        confirmPassword: confirmPassword
      }
    },
    onCompleted: (response, errors) => {
      let username = response.registerUser.username
      router.push('/')
    },
    onError: err => console.error(err)
  })
}

export default { commit }
