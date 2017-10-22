import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import Db from '../../database'
import { sequelize } from 'sequelize'
import { relay } from 'graphql-sequelize'
import { userType } from './userType'
import { themeType } from './themeType'

import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const solutionType = new GraphQLObjectType({
  name: 'SolutionTheme',
  description: 'A user solution of a gven theme',
  fields: () => ({
    id: globalIdField(),
    solution_data: {
      type: GraphQLString
    },
    user: {
      type: userType
    },
    theme: {
      type: themeType
    },
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [Db.models.theme_solution.userId]: solutionType
})
