import { GraphQLObjectType } from 'graphql'
import { createSolutionMutation } from './createSolutionMutation'

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createSolution: createSolutionMutation
  })
})
