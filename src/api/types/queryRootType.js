import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql'
import { userType } from './userType'
import { solutionType } from './solutionType'
import { themeType } from './themeType'
import { User, Theme } from '../../database'
import { resolver } from '../utils'
import { nodeField } from '../sequelizeIntegration'
import { acl } from '../accessControl'

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
      resolve: (obj, args, ctx) => {
        if (typeof ctx.user === 'undefined') {
          console.log('You should be logged in')
        } else {
          return acl.Solution.getSolution(ctx.user.id, args.id)
        }
      }
    },
    solutions: {
      type: new GraphQLList(solutionType),
      resolve: (obj, args, ctx) => {
        if (typeof ctx.user === 'undefined') {
          console.log('You should be logged in')
        } else {
          return acl.Solution.getSolutions(ctx.user.id)
        }
      }
    }
  })
})
