import React from 'react'
import { createFragmentContainer } from 'react-relay'
import { Form } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import registerUserMutation from './registerUserMutation'

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordsNotMatch: false
    }
  }

  showPasswordsNotMatch = () => {
		return(
				<p className='notification'> Passwords do not match </p>
		);
	} 
  

	handleSubmit = (event) => {
		let username = this.refs.username.value
		let password = this.refs.password.value
		let confirmPassword = this.refs.confirmpassword.value
    if (password === confirmPassword) {
      registerUserMutation.commit(this.props, username, password, confirmPassword)
    } else {
      this.setState({ passwordsNotMatch: true })
      this.refs.password.value = ''
      this.refs.confirmpassword.value = ''
    }
	}

  render() {
    return(
      <div>
        { this.state.passwordsNotMatch ? this.showPasswordsNotMatch() : null }
        <div className='row'>
          <div className='col-xs-offset-4 col-xs-5'>
            <Form onSubmit={ this.handleSubmit }>
                <div className='form-group'>
                    <label htmlFor='username' className='col-xs-5'>Username:</label>
                    <div className='col-xs-5 progressmargin'>
                        <input type='text' className='form-control' ref='username'/>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='password' className='col-xs-5'>Password: </label>
                    <div className='col-xs-5'>
                        <input type='password' className='form-control' ref='password' />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmpassword' className='col-xs-5'>Confirm Password: </label>
                    <div className='col-xs-5'>
                        <input type='password' className='form-control' ref='confirmpassword' />
                    </div>
                </div>
            </Form>
          </div>
					<RaisedButton type='submit' className='btn btn-default col-lg-offset-7' value='Submit'
							onClick={ (event) =>  { this.handleSubmit(event); }}> Register
					</RaisedButton>
        </div>
      </div>
    )
  }
}
