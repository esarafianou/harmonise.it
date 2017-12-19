import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { userType } from './userType.js'
import { User } from '../../database.js'

export const registerUserMutation = mutationWithClientMutationId({
  name: 'registerUser',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    confirmPassword: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (payload) => {
        return payload
      }
    }
  },
  mutateAndGetPayload: ({ username, password, confirmPassword }) => {
    return User.create({
      username: username,
      password: password
    })
  }
})
