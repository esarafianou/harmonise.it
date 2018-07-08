import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { solutionType } from './solutionType'
import { ThemeSolution } from '../../database.js'

export const updateSolutionMutation = mutationWithClientMutationId({
  name: 'updateSolution',
  inputFields: {
    solutionId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    solutionData: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    solution: {
      type: solutionType,
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({ solutionId, solutionData }) => {
    const { id } = fromGlobalId(solutionId)
    return ThemeSolution.find({
      where: {
        id: id
      }
    })
    .then((solution) => {
      return solution.update({
        solution_data: solutionData
      })
    })
  }
})
