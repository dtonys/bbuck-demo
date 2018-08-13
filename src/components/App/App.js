import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { NOT_FOUND } from 'redux-first-router';
import {
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_DASHBOARD,
  ROUTE_CASH_OUT,
  ROUTE_BUY,
  ROUTE_USER_PROFILE,
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

  componentDidMount() {
    this.loadComponent();
    this.handleWindowWidthChanged();
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

  render() {
    const { PageComponent, isMobile } = this.state;

    return (
      <div className={ styles.app } >
        <PageLayout isMobile={isMobile} >
          { PageComponent
            ? <PageComponent isMobile={isMobile} />
            : <div></div>
          }
        </PageLayout>
      </div>
    );
  }
}

export default hot(module)(App);
