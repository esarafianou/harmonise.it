import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import React from 'react'
import { graphql } from 'react-relay'

import Layout from './components/Layout'
import ThemesList from './components/ThemesList'
import SolutionsList from './components/SolutionsList'
import Solution from './components/Solution'
import Register from './components/Register'
import Login from './components/Login'
import Intro from './components/Intro'

const LayoutQuery = graphql`
  query routes_Layout_Query {
    me {
      ...Layout_me
    }
  }
`

const ThemesListQuery = graphql`
  query routes_ThemesList_Query {
    themes{
      ...ThemesList_themes
    }
  }
`

const SolutionsListQuery = graphql`
  query routes_SolutionsList_Query {
    solutions{
      ...SolutionsList_solutions
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
    query={LayoutQuery}
  >
    <Route
      Component={Intro}
    />
    <Route
      path='/themes'
      Component={ThemesList}
      query={ThemesListQuery}
    />
    <Route
      path='/solutions'
      Component={SolutionsList}
      query={SolutionsListQuery}
    />
    <Route
      path='/solutions/:solutionId'
      Component={Solution}
      query={SolutionQuery}
    />
    <Route
      path='/register'
      Component={Register}
    />
    <Route
      path='/login'
      Component={Login}
    />
  </Route>
)
