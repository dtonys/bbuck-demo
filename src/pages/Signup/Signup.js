import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import SignupForm from 'components/SignupForm/SignupForm';


import styles from './Signup.scss';


class SignupPage extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onFormSubmit = ( values ) => {
    console.log( JSON.stringify(values) );
    this.setState({
      submitted: true,
    });
  }

  render() {
    const { submitted } = this.state;

    return (
      <div className={styles.signup}>
        { !submitted &&
          <SignupForm
            onSubmit={ this.onFormSubmit }
          />
        }
        { submitted &&
          <div style={{ textAlign: 'center' }} >
            <p style={{ color: '#FFFFFF', fontSize: 18 }} >
              {`Thanks for signing up! `}
            </p>
            <p style={{ color: '#FFFFFF', fontSize: 18 }} >
              {`Please verify your account by logging in to your epic client and adding`}
            </p>
            <p style={{ color: '#ED4D50', fontSize: 24 }} > malcolmf </p>
            <p style={{ color: '#FFFFFF', fontSize: 18 }} >
              {`to your friends list.`}
            </p>
            <p style={{ color: '#FFFFFF', fontSize: 18 }} >
              {`You will recieve a confirmation email after your account has been verified.`}
            </p>
          </div>
        }
      </div>
    );
  }
}

export default hot(module)(SignupPage);
