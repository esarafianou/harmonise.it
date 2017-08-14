import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'

import { QueryRenderer, graphql } from 'react-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import MusicApp from './components/MusicApp'

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

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query appQuery {
        viewer {
          ...MusicApp_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (props) {
        return <MusicApp viewer={props.viewer} />
      } else {
        return <div>Loading</div>
      }
    }}
  />,
  mountNode
)
