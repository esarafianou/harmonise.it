import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { nodeInterface } from '../nodeDefinitions'
import { getMusicPiece, MusicPiece } from '../../database'
import { registerType } from '../typeRegistry'

export const GraphQLMusicPiece = new GraphQLObjectType({
  name: 'MusicPiece',
  description: '',
  fields: () => ({
    id: globalIdField('MusicPiece'),
    info: {
      type: GraphQLString,
      description: 'A music Piece',
      resolve: (obj) => obj.info
    }
  }),
  interfaces: () => [nodeInterface]
})

registerType(MusicPiece, GraphQLMusicPiece, getMusicPiece)
