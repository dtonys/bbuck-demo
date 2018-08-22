import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import { isRouteLoggedIn } from 'redux/routesMap';
import {
  Menu,
  Icon,
} from 'semantic-ui-react';

import styles from './Navbar.scss';


@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class Navbar extends Component {
  static propTypes = {
    routeAction: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  // constructor( props ) {
  //   super(props);
  // }

  render() {
    const {
      routeAction,
      isMobile,
      openSidebar,
      logout,
    } = this.props;
    const isLoggedIn = isRouteLoggedIn(routeAction);

    return (
      <div className={ styles.navbarWrap }>
        <Menu className={ styles.navbar } >
          <Link to="/"
            style={{
              height: 20,
              marginLeft: 20,
            }}
          >
            <img src="/img/logo_horizontal.png" style={{ height: 20 }} />
          </Link>
          <Menu.Menu position="right">
            { !isMobile && !isLoggedIn &&
              [
                <Menu.Item key="1" as="a" href="/doc/whitepaper.pdf" target="_blank">
                  WHITEPAPER
                </Menu.Item>,
                <Menu.Item key="2" as={Link} to="/signup">
                  SIGN UP
                </Menu.Item>,
              ]
            }
            { !isMobile && isLoggedIn &&
              [
                // <Menu.Item key="1" as={Link} to="/profile">
                //   PROFILE
                // </Menu.Item>,

                // <Menu.Item key="2" as={Link} to="/buy">
                //   BUY
                // </Menu.Item>,
                <Menu.Item key="3" as={Link} to="/cash-out">
                  CASH OUT
                </Menu.Item>,
                <Menu.Item key="4" as={Link} to="/dashboard">
                  DASHBOARD
                </Menu.Item>,
                <Menu.Item key="5" onClick={logout} >
                  LOGOUT
                </Menu.Item>,
              ]
            }
            { isMobile &&
              <Menu.Item>
                <Icon onClick={openSidebar} name='sidebar' size='large' />
              </Menu.Item>
            }
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}


export default hot(module)(Navbar);
