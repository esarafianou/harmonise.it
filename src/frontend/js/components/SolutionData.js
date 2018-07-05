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
      },
      themeData: '',
      solutionData: ''
    }
    this.eventListener = this.eventListener.bind(this)
  }

  _renderSolution (element, solutionInfo) {
    return renderSolution(element, solutionInfo, this.props.editable, this.state.cursor)
  }

  eventListener (event) {
    const cursor = {...this.state.cursor}
    if (event.key === 'ArrowRight') {
      cursor.position += 1
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowLeft') {
      cursor.position = Math.max(cursor.position - 1, 0)
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowDown') {
      if (cursor.stave === 0 && cursor.voice < 2) {
        cursor.voice = cursor.voice + 1
      } else if (cursor.voice === 2) {
        cursor.voice = 0
        cursor.stave = 1
      }
      this.setState({cursor: cursor})
    } else if (event.key === 'ArrowUp') {
      if (cursor.stave === 0) {
        cursor.voice = Math.max(cursor.voice - 1, 0)
      } else {
        cursor.voice = 2
        cursor.stave = 0
      }
      this.setState({cursor: cursor})
    } else if ((event.key >= 'a' && event.key <= 'g') || (event.key >= 'A' && event.key <= 'G')) {
      const solutionData = {...this.state.solutionData}
      if (this.props.givenVoice === 'soprano') {
        if (cursor.stave === 0) {
          if (cursor.voice !== 0) {
            solutionData[cursor.voice - 1][cursor.position].key = event.key + '/4'
            solutionData[cursor.voice - 1][cursor.position].type = 'note'
          } else {
            console.log('Not editable')
          }
        } else {
          solutionData[2][cursor.position].key = event.key + '/3'
          solutionData[2][cursor.position].type = 'note'
        }
      } else {
        if (cursor.stave === 0) {
          solutionData[cursor.voice][cursor.position].key = event.key + '/4'
          solutionData[2][cursor.position].type = 'note'
        } else {
          console.log('Not editable')
        }
      }
      this.setState({solutionData: solutionData})
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.eventListener)
    this.setState({ themeData: JSON.parse(this.props.themeData), solutionData: JSON.parse(this.props.solution.solution_data) })

    const themeSolutionData = constructThemeSolutionData(JSON.parse(this.props.themeData), JSON.parse(this.props.solution.solution_data), this.props.givenVoice)
    this._renderSolution(this.el, themeSolutionData)
  }

  componentDidUpdate () {
    const themeSolutionData = constructThemeSolutionData(this.state.themeData, this.state.solutionData, this.props.givenVoice)
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
