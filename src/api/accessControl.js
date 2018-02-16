import { ThemeSolution } from '../database'

export const acl = {
  Solution: {
    getSolutions: (authUser) => {
      return ThemeSolution.scope({ method: ['authorized', authUser.id] }).findAll()
    },
    getSolution: (authUser, opts) => {
      return ThemeSolution.scope({ method: ['authorized', authUser.id] }).find(opts)
    }
  }
}
