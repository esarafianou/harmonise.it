import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation deleteSolutionMutation($input: deleteSolutionInput!) {
    deleteSolution(input: $input) {
      solution{
        id
      }
    }
  }
`

function commit (props, solutionData) {
  const environment = props.relay.environment
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        solutionId: props.id
      }
    },
    onCompleted: (response, errors) => {
      props.router.push('/solutions')
      console.log(response.deleteSolution.solution.id)
    },
    onError: err => console.error(err)
  })
}

export default { commit }
