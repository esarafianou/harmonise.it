import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createFarceRouter from 'found/lib/createFarceRouter';
import React from 'react'
import ReactDOM from 'react-dom'
import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { Resolver } from 'found-relay';

import { routeConfig } from './routes';

const mountNode = document.getElementById('boo')
 
function fetchQuery (
  operation,
  variables
) {
  return fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json()
  })
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})

const historyMiddlewares = [queryMiddleware]
const resolver = new Resolver(modernEnvironment);
const render = createRender({})
const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares,
  routeConfig,
  resolver,
  render,
})
ReactDOM.render(
  <Router resolver={resolver} />,
  mountNode
)
