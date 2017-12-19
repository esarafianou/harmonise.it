import { GraphQLObjectType } from 'graphql'
import { createSolutionMutation } from './createSolutionMutation'
import { registerUserMutation } from './registerUserMutation'

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createSolution: createSolutionMutation,
    registerUser: registerUserMutation
  })
})
