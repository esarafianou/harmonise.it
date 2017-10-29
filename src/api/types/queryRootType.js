import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql'
import { resolver, relay } from 'graphql-sequelize'
import { sequelize } from 'sequelize'
import { userType } from './userType'
import { themeType } from './themeType'
import { User, Theme }  from '../../database'

import { nodeField } from '../sequelizeIntegration'

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: resolver(User)
    },
    theme: {
      type: themeType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: resolver(Theme)
    },
  })
})
