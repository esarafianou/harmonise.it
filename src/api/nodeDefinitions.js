import { nodeDefinitions } from 'graphql-relay'
import { getNodeFromID, getNodeType } from './typeRegistry'

export const { nodeInterface, nodeField } = nodeDefinitions(getNodeFromID, getNodeType)
