import { GraphQLSchema } from 'graphql'
import { mutationType } from './types/mutationRootType'
import { queryType } from './types/queryRootType'

export const schema = new GraphQLSchema({ query: queryType, mutation: mutationType })
