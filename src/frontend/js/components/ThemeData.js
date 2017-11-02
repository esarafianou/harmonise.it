import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderTheme from '../helpers/vexFlowThemeRendering'

export default class ThemeData extends React.Component {
  _renderTheme = (element, themeInfo) => {
    return renderTheme(element, JSON.parse(themeInfo))
  }

  componentDidMount () {
      this._renderTheme(this.props.id, this.props.themeData)
  }

  render () {
    return (
      <div id={this.props.id} ref={el => this.el = el}>
      </div>
    )
  }
}
