import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from 'graphql'
import { resolver, relay } from 'graphql-sequelize'
import { sequelize } from 'sequelize'
import { userType } from './userType'
import Db from '../../database'

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
      resolve: () => resolver(Db.models.user)
    }
  })
})
