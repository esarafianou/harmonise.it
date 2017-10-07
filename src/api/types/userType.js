import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { userMusicPiecesConnection } from '../connections/MusicPiecesConnection'
import Db from '../../database'
import { sequelize } from 'sequelize'
import { relay } from 'graphql-sequelize'

import { nodeTypeMapper, nodeInterface } from '../sequelizeIntegration'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: globalIdField(),
    userName: {
      type: GraphQLString
    },
    musicPieces: {
      description: 'A music Piece',
      type: userMusicPiecesConnection.connectionType,
      args: userMusicPiecesConnection.connectionArgs,
      resolve: userMusicPiecesConnection.resolve
    }
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [Db.models.user.id]: userType
})
