import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { User, ThemeSolution } from '../../database'
import { solutionType } from './solutionType'
import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: globalIdField(),
    username: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    solutions: {
      type: new GraphQLList(solutionType),
      resolve: (obj, args) => {
        return ThemeSolution.findAll({
          where: {
            userId: obj.id
          }
        })
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [User.id]: userType
})
