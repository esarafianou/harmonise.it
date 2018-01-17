import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from './database.js'
import * as argon2 from 'argon2'

let checkPassword = (username, password) => {
  return User.find({
    where: {
      username: username
    }
  })
  .then(user => {
    if (user !== null) {
      return argon2.verify(user.password, password)
      .catch(() => {
        throw new Error('Something went wrong. Please try again.')
      })
      .then(match => {
        if (match) {
          return user
        } else {
          throw new Error('Invalid username or password')
        }
      })
    } else {
      throw new Error('Invalid username or password')
    }
  })
}
passport.use(new Strategy(
  function (username, password, done) {
    checkPassword(username, password)
    .then(user => done(null, user))
    .catch(() => done(null, false))
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  return User.find({
    where: {
      id: id
    }
  })
  .then((user, err) => {
    return done(err, user)
  })
})
