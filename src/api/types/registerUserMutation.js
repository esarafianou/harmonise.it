import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { userType } from './userType.js'
import { User } from '../../database.js'
import * as argon2 from 'argon2'

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
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    } else {
      return argon2.hash(password).then(hashedPassword => {
        return User.create({
          username: username,
          password: hashedPassword
        })
      }).catch(() => {
        throw new Error('Something went wrong. Please try to register again')
      })
    }
  }
})
