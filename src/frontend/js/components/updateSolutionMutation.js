import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation updateSolutionMutation($input: updateSolutionInput!) {
    updateSolution(input: $input) {
      solution{
        id,
        solution_data
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
        solutionId: props.id,
        solutionData: JSON.stringify(solutionData)
      }
    },
    onCompleted: (response, errors) => {
      console.log(response.updateSolution.solution.id)
    },
    onError: err => console.error(err)
  })
}

export default { commit }
