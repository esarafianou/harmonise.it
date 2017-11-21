import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation createSolutionMutation($input: createSolutionInput!) {
    createSolution(input: $input) {
      solution{
        id,
        solution_data
      }
    }
  }
`

function commit (props, theme) {
  const environment = props.relay.environment
  const router = props.router
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        themeId: theme.id
      }
    },
    onCompleted: (response, errors) => {
      let solutionId = response.createSolution.solution.id
      router.push('/solutions/' + solutionId)
    },
    onError: err => console.error(err)
  })
}

export default { commit }
