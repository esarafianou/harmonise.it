import { GraphQLObjectType } from 'graphql'
import { createSolutionMutation } from './createSolutionMutation'
import { updateSolutionMutation } from './updateSolutionMutation'
import { registerUserMutation } from './registerUserMutation'

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createSolution: createSolutionMutation,
    updateSolution: updateSolutionMutation,
    registerUser: registerUserMutation
  })
})
