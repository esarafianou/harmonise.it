import pathModule from 'path'
import express from 'express'
import graphQLHTTP from 'express-graphql'
import { schema } from './api/schema'

const app = express()
const graphqlHttpConfig = (schema) => ({ schema, pretty: true, graphiql: true })

app.use('/api', graphQLHTTP(graphqlHttpConfig(schema)))

app.use(express.static(pathModule.join(__dirname, '../dist')))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`)
})
