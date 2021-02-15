import { GraphQLObjectType } from 'graphql'
import { createSolutionMutation } from './createSolutionMutation'
import { updateSolutionMutation } from './updateSolutionMutation'
import { registerUserMutation } from './registerUserMutation'
import { deleteSolutionMutation } from './deleteSolutionMutation'

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createSolution: createSolutionMutation,
    updateSolution: updateSolutionMutation,
    deleteSolution: deleteSolutionMutation,
    registerUser: registerUserMutation
  })
})
