import { musicPieceType } from '../types/musicPieceType'
import { relay } from 'graphql-sequelize'
import Db from '../../database.js'

export const userMusicPiecesConnection = relay.sequelizeConnection({
  name: 'userMusicPiece',
  nodeType: musicPieceType,
  target: Db.models.musicpiece
  // target: Db.models.user.musicpieces | Db.models.musicpiece
})
