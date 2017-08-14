import { GraphQLSchema } from 'graphql'
import { queryType } from './types/queryRootType'
import { mutationType } from './types/mutationRootType'

export const schema = new GraphQLSchema({ query: queryType, mutation: mutationType })
