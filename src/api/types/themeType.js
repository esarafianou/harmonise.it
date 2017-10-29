import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { globalIdField } from 'graphql-relay'
import { solutionType } from './solutionType'
import { Theme, ThemeSolution } from '../../database'
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
      type: new GraphQLList(solutionType),
      resolve: (obj, args) => {
        return ThemeSolution.findAll({
          where: {
            themeId: obj.id
          }
        })
      }
    }
  }),
  interfaces: () => [nodeInterface]
})

nodeTypeMapper.mapTypes({
  [Theme.id]: themeType
})
