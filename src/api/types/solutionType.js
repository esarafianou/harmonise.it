import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { User, Theme, ThemeSolution } from '../../database'
import { userType } from './userType'
import { themeType } from './themeType'
import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const solutionType = new GraphQLObjectType({
  name: 'SolutionTheme',
  description: 'A user solution of a gven theme',
  fields: () => ({
    solution_data: {
      type: GraphQLString
    },
    user: {
      type: userType,
      resolve: (obj, args) => {
        return User.find({
          where: {
            id: obj.userId
          }
        })
      }
    },
    theme: {
      type: themeType,
      resolve: (obj, args) => {
        return Theme.find({
          where: {
            id: obj.themeId
          }
        })
      }
    },
  }),
})

nodeTypeMapper.mapTypes({
  [ThemeSolution.userId]: solutionType
})
