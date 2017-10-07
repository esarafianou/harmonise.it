import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { sequelize } from 'sequelize'
import { relay } from 'graphql-sequelize'
import Db from '../../database'

import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const musicPieceType = new GraphQLObjectType({
  name: 'MusicPiece',
  description: '',
  fields: () => ({
    id: globalIdField(),
    content: {
      type: GraphQLString,
      description: 'A music Piece'
    }
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [Db.models.musicpiece.id]: musicPieceType
})
