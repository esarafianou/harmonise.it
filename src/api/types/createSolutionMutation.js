import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID } from 'graphql'
import { mutationWithClientMutationId,fromGlobalId } from 'graphql-relay'
import { solutionType } from './solutionType'
import { User, Theme, ThemeSolution } from '../../database.js'

const _createSolutionData = (theme) => {
  let voices = []
  let note
  let themeData = JSON.parse(theme.theme_data)
  for (let i = 0; i <= 3; i++) {
    let currentVoice = []
    for (let j = 0; j < themeData.voice.length; j++) {
      note = Object.assign({}, themeData.voice[j])  
      note.type = 'pause'
      if (theme.given_voice === 'bass') {
        note.hint = ''
        note.rank = null
      }
      currentVoice.push(note)
    }
    voices.push(currentVoice)
  }
  return JSON.stringify(voices)
}

export const createSolutionMutation = mutationWithClientMutationId({
  name: 'createSolution',
  inputFields: {
    themeId: {
      type: new GraphQLNonNull(GraphQLString)
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  outputFields: {
    solution: {
      type: solutionType,
      resolve: ((payload) => {
        return payload
      })
    },
  },
  mutateAndGetPayload: ({userId, themeId }) => {
    const { type, id } = fromGlobalId(userId)
    return User.find({
      where: {
        id: id
      }
    })
    .then((user) => {
      const { type, id } = fromGlobalId(themeId)
      return Theme.find({
        where: {
          id: id
        }
      })
      .then((theme) =>  {
        let solution_data = _createSolutionData(theme)
        return ThemeSolution.create({
          userId: user.id,
          themeId: theme.id,
          solution_data: solution_data 
        })
      })
    })
  }
})
