import queryMiddleware from 'farce/lib/queryMiddleware'
import createRender from 'found/lib/createRender'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import { Resolver } from 'found-relay'
import React from 'react'
import { graphql } from 'react-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import MusicApp from './components/MusicApp'
import MusicPiece from './components/MusicPiece'
import Test from './components/Test'

const MusicPieceQuery = graphql`
  query routes_MusicPiece_Query {
      ...MusicPiece_user
  }
`
export const routeConfig = makeRouteConfig(
  <Route
    path='/'
    Component={MusicApp}
    query={graphql`
      query routes_MusicApp_Query {
        users {
          ...MusicApp_user
        }
      }
    `}
  >
    <Route
      Component={MusicPiece}
      query={MusicPieceQuery}
    />,
    <Route
      path='test'
      Component={Test}
    />
  </Route>,
)
