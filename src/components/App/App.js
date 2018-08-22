import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redirect, NOT_FOUND } from 'redux-first-router';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import {
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_DASHBOARD,
  ROUTE_CASH_OUT,
  ROUTE_BUY,
  ROUTE_USER_PROFILE,
  isRouteLoggedIn,
} from 'redux/routesMap';

import {
  getWindowWidth,
  windowWidthIsMobile,
  currentWindowWidthIsMobile,
} from 'helpers/browser';
import PageLayout from 'components/PageLayout/PageLayout';
import styles from './App.scss';


const actionToComponentPath = {
  [ ROUTE_LOGIN ]: 'Login/Login',
  [ ROUTE_SIGNUP ]: 'Signup/Signup',
  [ ROUTE_DASHBOARD ]: 'Dashboard/Dashboard',
  [ ROUTE_CASH_OUT ]: 'CashOut/CashOut',
  [ ROUTE_BUY ]: 'Buy/Buy',
  [ ROUTE_USER_PROFILE ]: 'UserProfile/UserProfile',
  [ NOT_FOUND ]: 'NotFound/NotFound',
};

@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class App extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
  };

  constructor( props ) {
    super(props);
    this.state = {
      isMobile: currentWindowWidthIsMobile(),
      PageComponent: null,
      // user session
      user: null,
      // login state
      loginLoaded: false,
      loginSuccess: false,
      // signup state
      signupLoaded: false,
      signupSuccess: false,
    };
  }

  loadComponent = async () => {
    const { routeAction } = this.props;
    const componentPath = actionToComponentPath[routeAction];
    const component = await import(`../../pages/${componentPath}`);
    this.setState({
      PageComponent: component.default,
    });
  }

  async componentDidMount() {
    const { routeAction } = this.props;
    this.handleWindowWidthChanged();
    const user = await this.getSession();
    // On page load, redirect to login if not logged in
    if ( !user && isRouteLoggedIn(routeAction) ) {
      this.props.dispatch( redirect({ type: ROUTE_LOGIN }) );
    }
    this.loadComponent();
  }

  handleWindowWidthChanged = () => {
    let windowWidth = getWindowWidth();
    window.addEventListener('resize', () => {
      const nextWindowWidth = getWindowWidth();
      const windowWidthChanged = ( windowWidthIsMobile(nextWindowWidth) !== windowWidthIsMobile(windowWidth) );
      if ( windowWidthChanged ) {
        this.setState({
          isMobile: windowWidthIsMobile(nextWindowWidth),
        });
      }
      windowWidth = nextWindowWidth;
    });
  }

  componentDidUpdate( prevProps /* , prevState */ ) {
    const routeChanged = ( prevProps.routeAction !== this.props.routeAction );
    if ( routeChanged ) {
      this.loadComponent();
    }
  }

  login = () => {
    return new Promise(( resolve, reject ) => {
      setTimeout(() => {
        const loginSuccess = true;
        // success
        if ( loginSuccess ) {
          this.getSession()
            .then(() => {
              resolve();
            });
        }
        else reject();
      }, 1000);
    });
  };

  logout = () => {
    return new Promise(( resolve, reject ) => {
      setTimeout(() => {
        this.setState({
          user: null,
        });
        this.props.dispatch( redirect({ type: ROUTE_LOGIN }) );
        resolve();
      }, 1000);
    });
  };

  signup = () => {
    return new Promise(( resolve, reject ) => {
      setTimeout(() => {
        const signupSuccess = true;
        // success
        if ( signupSuccess ) resolve();
        else reject();
      }, 1000);
    });
  };

  getSession = () => {
    return new Promise(( resolve, reject ) => {
      setTimeout(() => {
        // success, error
        const user = null;
        // const user = {
        //   username: 'tony',
        // };
        this.setState({
          user: user,
        });
        resolve( user );
      }, 1000);
    });
  }

  render() {
    const {
      PageComponent,
      isMobile,
      user,
      loginLoaded, loginSuccess,
      signupLoaded, signupSuccess,
    } = this.state;

    return (
      <div className={ styles.app } >
        <PageLayout
          isMobile={isMobile}
          logout={this.logout}
        >
          { PageComponent
            ? <PageComponent
              isMobile={isMobile}
              user={user}
              loginLoaded={loginLoaded}
              loginSuccess={loginSuccess}
              signupLoaded={signupLoaded}
              signupSuccess={signupSuccess}
              login={this.login}
              signup={this.signup}
            />
            : <div> Loading... </div>
          }
        </PageLayout>
      </div>
    );
  }
}

export default hot(module)(App);
