import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { sequelize } from 'sequelize'
import { relay } from 'graphql-sequelize'
import themeSolutionConnection from '../connections/themeSolutionConnection'
import Db from '../../database'

import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const themeType = new GraphQLObjectType({
  name: 'Theme',
  description: '',
  fields: () => ({
    id: globalIdField(),
    difficulty: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    given_voice: {
      type: GraphQLString
    },
    theme_data: {
      type: GraphQLString,
      description: 'The theme to be solved'
    },
    solutions: {
      description: 'A theme',
      type: themeSolutionConnection().connectionType,
      args: themeSolutionConnection().connectionArgs,
      resolve: themeSolutionConnection().resolve
    }, 
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [Db.models.theme.id]: themeType
})
