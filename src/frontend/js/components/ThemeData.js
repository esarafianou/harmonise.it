import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderTheme from '../helpers/vexFlowThemeRendering'

class ThemeData extends React.Component {
  _renderTheme = (element, themeInfo) => {
    return renderTheme(element, JSON.parse(themeInfo))
  }

  componentDidMount () {
    this._renderTheme(this.el, this.props.theme.theme_data)
  }

  render () {
    return (
      <div ref={el => this.el = el} />
    )
  }
}

export default createFragmentContainer(ThemeData,
  graphql`
    fragment ThemeData_theme on Theme {
      theme_data
    }
  `
)
