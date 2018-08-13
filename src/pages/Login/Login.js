import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import LoginForm from 'components/LoginForm/LoginForm';
import { redirect } from 'redux-first-router';
import { ROUTE_DASHBOARD } from 'redux/routesMap';


import styles from './Login.scss';

@connect()
class LoginPage extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onFormSubmit = ( values ) => {
    this.props.dispatch( redirect({ type: ROUTE_DASHBOARD }) );
  }

  render() {
    const { submitted } = this.state;
    return (
      <div className={styles.loginPageWrap} >
        <div style={{ marginTop: 100 }} ></div>
        <div className={styles.loginPromptWrap} >
          <span className={ styles.loginPromptText } >
            {'Stop playing for free, '}
            <span
              className={ styles.loginPromptText }
              style={{ color: '#ED4D50' }}
            >
              get paid to play
            </span>
          </span>
        </div>
        <div className={styles.login}>
          <br /><br /><br />
          <div>
            <LoginForm
              onSubmit={ this.onFormSubmit }
            />
            <br /><br />
            <div className={ styles.socialSignInWrap } >
              <div className={ styles.socialSignIn__text } >
                sign in with
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
            <br />
            <div style={{ textAlign: 'center' }} >
              <p style={{ color: '#FFFFFF' }} > Don't have an account? &nbsp;
                <Link to="/signup" style={{ color: '#ED4D50' }} >Register Now!</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(LoginPage);
