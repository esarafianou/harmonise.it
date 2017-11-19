import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import React from 'react'
import { graphql } from 'react-relay'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'

import Layout from './components/Layout'
import ThemesList from './components/ThemesList'
import Test from './components/Test'
import Solution from './components/Solution'

const ThemesListQuery = graphql`
  query routes_ThemesList_Query {
    themes{
      ...ThemesList_themes
    }
  }
`
const SolutionQuery = graphql`
  query routes_Solution_Query($solutionId: String!) {
    solution(id: $solutionId) {
      ...Solution_solution
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
      path='/solutions/:solutionId'
      Component={Solution}
      query={SolutionQuery}
    />
    <Route
      path='test'
      Component={Test}
    />
  </Route>
)
