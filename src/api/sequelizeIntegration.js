import { relay } from 'graphql-sequelize'
import { Connection } from '../database'

export const { nodeInterface, nodeField, nodeTypeMapper } = relay.sequelizeNodeInterface(Connection)
