import queryMiddleware from 'farce/lib/queryMiddleware'
import createRender from 'found/lib/createRender'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import { Resolver } from 'found-relay'
import React from 'react'
import { graphql } from 'react-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


import Layout from './components/Layout'
import ThemesList from './components/ThemesList'
import Test from './components/Test'

const ThemesListQuery = graphql`
  query routes_ThemesList_Query {
    themes{
      ...ThemesList_themes
    }
  }
`
export const routeConfig = makeRouteConfig(
  <Route
    path='/'
    Component={Layout}
  >
    <Route
      Component={ThemesList}
      query={ThemesListQuery}
    />,
    <Route
      path='test'
      Component={Test}
    />
  </Route>,
)
