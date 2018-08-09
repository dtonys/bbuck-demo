import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './App.scss';
import { NOT_FOUND } from 'redux-first-router';
import Link from 'redux-first-router-link';
import {
  ROUTE_HOME,
  ROUTE_SIGNUP,
  ROUTE_DASHBOARD,
} from 'redux/routesMap';
import { hot } from 'react-hot-loader';
import { Menu } from 'semantic-ui-react';


const actionToComponentPath = {
  [ ROUTE_HOME ]: 'Home/Home',
  [ ROUTE_SIGNUP ]: 'Signup/Signup',
  [ ROUTE_DASHBOARD ]: 'Dashboard/Dashboard',
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
  }

  componentDidUpdate( prevProps /* , prevState */ ) {
    const routeChanged = ( prevProps.routeAction !== this.props.routeAction );
    if ( routeChanged ) {
      this.loadComponent();
    }
  }

  render() {
    const { PageComponent } = this.state;

    return (
      <div className={ styles.app } >
        { this.props.routeAction !== 'ROUTE_DASHBOARD' &&
          <Menu className={ styles.menu } >
            <img
              style={{
                height: 20,
                marginLeft: 20,
              }}
              src="/img/logo_horizontal.png" alt=""
            />
            <Menu.Menu position='right'>
              <Menu.Item as={Link} to='/signup'>
                SIGNUP
              </Menu.Item>
              <Menu.Item as={Link} to='/'>
                LOGIN
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        }
        { this.props.routeAction === 'ROUTE_DASHBOARD' &&
          <Menu className={ styles.menu } >
            <img
              style={{
                height: 20,
                marginLeft: 20,
              }}
              src="/img/logo_horizontal.png" alt=""
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                DASHBOARD
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        }

        { PageComponent && <PageComponent /> }
      </div>
    );
  }
}

export default hot(module)(App);
