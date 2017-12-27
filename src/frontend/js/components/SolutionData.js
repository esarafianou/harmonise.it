import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderSolution from '../helpers/vexFlowSolutionRendering'
import { constructThemeSolutionData } from '../helpers/constructThemeSolutionData'

class SolutionData extends React.Component {
  _renderSolution (element, solutionInfo) {
    return renderSolution(element, solutionInfo)
  }

  componentDidMount () {
    let themeSolutionData = constructThemeSolutionData(JSON.parse(this.props.themeData), JSON.parse(this.props.solution.solution_data), this.props.givenVoice)
    this._renderSolution(this.el, themeSolutionData)
  }

  render () {
    return (
      <div ref={el => { this.el = el }} />
    )
  }
}

export default createFragmentContainer(SolutionData,
  graphql`
    fragment SolutionData_solution on SolutionTheme {
      solution_data
    }
  `
)
