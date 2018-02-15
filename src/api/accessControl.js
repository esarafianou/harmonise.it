import { fromGlobalId } from 'graphql-relay'
import { ThemeSolution } from '../database'

export const acl = {
  Solution: {
    getSolutions: (authUserId) => {
      return ThemeSolution.findAll({
        where: {
          userId: authUserId
        }
      })
    },
    getSolution: (authUserId, solutionId) => {
      const { id } = fromGlobalId(solutionId)
      return ThemeSolution.find({
        where: {
          id: id,
          userId: authUserId
        }
      })
    }
  }
}
