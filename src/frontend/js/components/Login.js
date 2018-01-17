import React from 'react'
import { RaisedButton } from 'material-ui'
import { Form } from 'react-bootstrap'
import axios from 'axios'

export default class Login extends React.Component {
  handleSubmit (event) {
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    const config = {
      validateStatus: function (status) {
        return status === 200 || status === 401
      }
    }
    axios.post('/api/login', data, config)
    .then((response) => {
      if (response.status === 200) {
        this.props.router.push('/')
      } else {
        console.log('Invalid username or password')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-offset-4 col-xs-5'>
            <Form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='username' className='col-xs-5'>Username:</label>
                <div className='col-xs-5 progressmargin'>
                  <input type='text' className='form-control' ref='username' />
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='password' className='col-xs-5'>Password: </label>
                <div className='col-xs-5'>
                  <input type='password' className='form-control' ref='password' />
                </div>
              </div>
            </Form>
          </div>
          <RaisedButton type='submit' className='btn btn-default col-lg-offset-7' value='Submit'
            onClick={(event) => { this.handleSubmit(event) }}> Login
          </RaisedButton>
        </div>
      </div>
    )
  }
}
