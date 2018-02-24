import pathModule from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'
import passport from 'passport'
import bodyParser from 'body-parser'
import { schema } from './api/schema'
import './auth'

const app = express()
const graphqlHttpConfig = (schema) => ({ schema, pretty: true, graphiql: true })

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

// login route for passport
app.post('/api/login', bodyParser.urlencoded({ extended: true }), bodyParser.json(), passport.authenticate('local'),
  function (req, res) {
    res.json({username: req.user.username})
  }
)

// logout route for passport
app.post('/api/logout',
  function (req, res) {
    req.logout()
    res.json({})
  }
)

app.use('/api', graphQLHTTP(graphqlHttpConfig(schema)))

app.use(express.static(pathModule.join(__dirname, '../dist')))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`)
})
