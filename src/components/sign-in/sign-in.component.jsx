import React from 'react';
import { connect } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions.js';
import CustomButton from '../custom-button/custom-button.component.jsx';
import FormInput from '../form-input/form-input.component.jsx';

import './sign-in.styles.scss';
class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;
        emailSignInStart({email, password})
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const { googleSignInStart } = this.props;
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                   <FormInput 
                        name='email' 
                        type='email' 
                        handleChange={this.handleChange}
                        value={this.state.email} 
                        label='email'
                        required 
                    />
                   <FormInput 
                        name='password' 
                        type='password' 
                        handleChange={this.handleChange}
                        value={this.state.password} 
                        label='password'
                        required 
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const  mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: ( email, password ) => dispatch(emailSignInStart(email, password))
})

export default connect(
    null,
    mapDispatchToProps
) (SignIn);