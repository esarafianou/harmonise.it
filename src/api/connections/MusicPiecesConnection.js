import { GraphQLMusicPiece } from '../types/musicPieceType';
import { connectionDefinitions } from 'graphql-relay';

export const { connectionType: MusicPiecesConnection, edgeType: GraphQLMusicPieceEdge,} = 
	connectionDefinitions({name: 'MusicPiece', nodeType: GraphQLMusicPiece,});
