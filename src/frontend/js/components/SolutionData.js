import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import renderSolution from '../helpers/vexFlowSolutionRendering'
import { constructThemeSolutionData } from '../helpers/constructThemeSolutionData'

class SolutionData extends React.Component {
  constructor () {
    super()
    this.state = {
      cursor: {
        stave: 0,
        voice: 0,
        position: 0
      }
    }
    this.eventListener = this.eventListener.bind(this)
  }

  _renderSolution (element, solutionInfo) {
    return renderSolution(element, solutionInfo, this.props.editable, this.state.cursor)
  }

  eventListener (event) {
    if (event.keyCode === 39) {
      let cursor = {...this.state.cursor}
      cursor.position += 1
      this.setState({cursor: cursor})
    } else if (event.keyCode === 37) {
      let cursor = {...this.state.cursor}
      cursor.position = Math.max(cursor.position - 1, 0)
      this.setState({cursor: cursor})
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.eventListener)

    const themeSolutionData = constructThemeSolutionData(JSON.parse(this.props.themeData), JSON.parse(this.props.solution.solution_data), this.props.givenVoice)
    this._renderSolution(this.el, themeSolutionData)
  }

  componentDidUpdate () {
    const themeSolutionData = constructThemeSolutionData(JSON.parse(this.props.themeData),
      JSON.parse(this.props.solution.solution_data), this.props.givenVoice)
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild)
    }
    this._renderSolution(this.el, themeSolutionData)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.eventListener)
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
