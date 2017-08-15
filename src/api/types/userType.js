import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay'
import { nodeInterface } from '../nodeDefinitions'
import { MusicPiecesConnection } from '../connections/MusicPiecesConnection'
import { getUser, User, getMusicPieces } from '../../database'
import { registerType } from '../typeRegistry'

export const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  description: '',
  fields: () => ({
    id: globalIdField('User'),
    musicPieces: {
      type: MusicPiecesConnection,
      description: 'A music Piece',
      args: {...connectionArgs},
      resolve: (obj, {...args}) => connectionFromArray(getMusicPieces(), args)
    }
  }),
  interfaces: () => [nodeInterface]
})

registerType(User, GraphQLUser, getUser)
