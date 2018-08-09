import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import { hot } from 'react-hot-loader';
import LoginForm from 'components/LoginForm/LoginForm';
import { redirect } from 'redux-first-router';
import { ROUTE_DASHBOARD } from 'redux/routesMap';


import styles from './Home.scss';

@connect()
class HomePage extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onFormSubmit = ( values ) => {
    // console.log( JSON.stringify(values) );
    this.props.dispatch( redirect({ type: ROUTE_DASHBOARD }) );
  }

  render() {
    const { submitted } = this.state;
    return (
      <div className={styles.home}>
        <div>
          <LoginForm
            onSubmit={ this.onFormSubmit }
          />
          <br />
          <div style={{ textAlign: 'center' }} >
            <p style={{ color: '#FFFFFF' }} > Don't have an account? &nbsp;
              <Link to="/signup" style={{ color: '#ED4D50' }} >Register Now.</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(HomePage);
