import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation createSolutionMutation($input: createSolutionInput!) {
    createSolution(input: $input) {
      solution{
        solution_data
      }
    }
  }
`;

function commit(environment, theme) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        themeId: theme.id,
        userId: 'VXNlcjogMQ=='
      },
    },
    onCompleted: (response, errors) => {
      console.log('Response received from server.', response)
      console.log(response.createSolution)
    },
    onError: err => console.error(err),
  });
}

export default { commit }
