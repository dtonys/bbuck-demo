import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import SignupForm from 'components/SignupForm/SignupForm';
import Link from 'redux-first-router-link';

import styles from './Signup.scss';


class SignupPage extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
  };

  constructor( props ) {
    super(props);
    this.state = {
      submitSuccess: false,
      submitError: false,
    };
  }

  onFormSubmit = ( values ) => {

    this.props.signup(values)
      .then(() => {
        this.setState({
          submitSuccess: true,
        });
      })
      .catch(() => {
        this.setState({
          submitError: true,
        });
      });
  }

  render() {
    const {
      submitSuccess,
      submitError,
    } = this.state;

    return (
      <div className={styles.signupPageWrap} >
        <div style={{ marginTop: 100 }} ></div>
        <div className={styles.signupPromptWrap} >
          <span className={ styles.signupPromptText } >
            {'Stop playing for free, '}
            <span
              className={ styles.signupPromptText }
              style={{ color: '#ED4D50' }}
            >
              get paid to play
            </span>
          </span>
        </div>
        <div className={styles.signup}>
          { !submitSuccess &&
            <div>
              { submitError &&
                <div>
                  <div style={{ color: '#ED4D50' }} >
                    Invalid data. Please try again.
                  </div>
                  <br />
                </div>
              }
              <SignupForm
                onSubmit={ this.onFormSubmit }
              />
              <br />
              <div className={ styles.socialSignInWrap } >
                <div className={ styles.socialSignIn__text } >
                  sign up with
                </div>
                <div className={ styles.socialSignIn__iconWrap } >
                  <div style={{ width: '33.3%' }} ><img
                    width="15"
                    className={ styles.socialSignIn__icon }
                    src="/img/facebook_icon@2x.png"
                  /></div>
                  <div style={{ width: '33.3%' }} ><img
                    width="30"
                    className={ styles.socialSignIn__icon }
                    src="/img/instagram@2x.png"
                  /></div>
                  <div style={{ width: '33.3%' }} ><img
                    width="40"
                    className={ styles.socialSignIn__icon }
                    src="/img/gplus_icon@2x.png"
                  /></div>
                </div>
              </div>
              <div style={{ textAlign: 'center' }} >
                <p style={{ color: '#FFFFFF' }} > Already have an account? &nbsp;
                  <Link to="/" style={{ color: '#ED4D50' }} >Log in!</Link>
                </p>
              </div>

            </div>
          }
          { submitSuccess &&
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
      </div>
    );
  }
}

export default hot(module)(SignupPage);
