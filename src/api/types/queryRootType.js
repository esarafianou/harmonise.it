import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'
import { fromGlobalId } from 'graphql-relay'
import { sequelize } from 'sequelize'
import { userType } from './userType'
import { solutionType } from './solutionType'
import { themeType } from './themeType'
import { User, Theme, ThemeSolution }  from '../../database'
import { resolver } from '../utils'
import { nodeField } from '../sequelizeIntegration'

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: resolver(User)
    },
    theme: {
      type: themeType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: resolver(Theme)
    },
    themes: {
      type: new GraphQLList(themeType),
      resolve: (obj, args) => {
        return Theme.findAll()
      }
    },
    solution: {
      type: solutionType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: resolver(ThemeSolution)
    },
    solutions: {
      type: new GraphQLList(solutionType),
      resolve: (obj, args) => {
        return ThemeSolution.findAll()
      }
    },
  })
})
