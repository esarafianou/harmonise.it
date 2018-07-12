import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { solutionType } from './solutionType'
import { Theme, ThemeSolution } from '../../database.js'

const pauseHeightAdjustment = {
  soprano: {
    0: 'g/4',
    1: 'f/4',
    2: 'e/3'
  },
  bass: {
    0: 'c/5',
    1: 'f/4',
    2: 'e/4'
  }
}

const solutionDataVoices = {
  soprano: {
    0: 'alto',
    1: 'tenoro',
    2: 'bass'
  },
  bass: {
    0: 'soprano',
    1: 'alto',
    2: 'tenoro'
  }
}

const _createSolutionData = (theme) => {
  let voices = {}
  let note
  let themeData = JSON.parse(theme.theme_data)
  for (let i = 0; i < 3; i++) {
    let currentVoice = []
    for (let j = 0; j < themeData.voice.length; j++) {
      note = Object.assign({}, themeData.voice[j])
      note.key = pauseHeightAdjustment[theme.given_voice][i]
      note.type = 'pause'
      note.accidental = ''
      if (theme.given_voice === 'bass') {
        note.hint = ''
        note.rank = null
      }
      currentVoice.push(note)
    }
    voices[solutionDataVoices[theme.given_voice][i]] = currentVoice
  }
  return JSON.stringify(voices)
}

export const createSolutionMutation = mutationWithClientMutationId({
  name: 'createSolution',
  inputFields: {
    themeId: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    solution: {
      type: solutionType,
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({ themeId }, { user }) => {
    const { id } = fromGlobalId(themeId)
    return Theme.find({
      where: {
        id: id
      }
    })
    .then((theme) => {
      let solutionData = _createSolutionData(theme)
      return ThemeSolution.create({
        userId: user.id,
        themeId: theme.id,
        solution_data: solutionData
      })
    })
  }
})
