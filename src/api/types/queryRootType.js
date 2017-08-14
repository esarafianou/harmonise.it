import { GraphQLObjectType } from 'graphql'
import { GraphQLUser } from './userType'
import { nodeField } from '../nodeDefinitions'
import { getViewer } from '../../database'

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    }
  })
})
