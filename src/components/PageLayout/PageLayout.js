import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import Link from 'redux-first-router-link';
import {
  Sidebar,
  Menu,
} from 'semantic-ui-react';
import { isRouteLoggedIn } from 'redux/routesMap';


@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class PageLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  constructor( props ) {
    super(props);
    this.state = {
      mobileSidebarOpen: false,
    };
  }

  openSidebar = () => {
    this.setState({
      mobileSidebarOpen: true,
    });
  }

  closeSidebar = () => {
    if ( !this.state.mobileSidebarOpen ) return;
    this.setState({
      mobileSidebarOpen: false,
    });
  }

  render() {
    const { mobileSidebarOpen } = this.state;
    const { children, isMobile, routeAction } = this.props;
    const isLoggedIn = isRouteLoggedIn(routeAction);

    return (
      <div style={{ height: '100%' }} >
        <Sidebar.Pushable as="div">
          { isMobile &&
            <Sidebar
              as={Menu}
              animation='overlay'
              direction='right'
              icon='labeled'
              inverted
              vertical
              visible={mobileSidebarOpen}
              width='thin'
            >
              { !isLoggedIn &&
                [
                  <Menu.Item
                    key="1"
                    as="a"
                    href="/doc/whitepaper.pdf"
                    target="_blank" onClick={this.closeSidebar}
                  >
                    WHITEPAPER
                  </Menu.Item>,
                  <Menu.Item
                    key="2"
                    as={Link}
                    to="/signup"
                    onClick={this.closeSidebar}
                  >
                    SIGN UP
                  </Menu.Item>,
                ]
              }
              { isLoggedIn &&
                [
                  // <Menu.Item
                  //   key="1"
                  //   as={Link}
                  //   to="/profile"
                  //   onClick={this.closeSidebar}
                  // >
                  //   PROFILE
                  // </Menu.Item>,
                  // <Menu.Item
                  //   key="2"
                  //   as={Link}
                  //   to="/buy"
                  //   onClick={this.closeSidebar}
                  // >
                  //   BUY
                  // </Menu.Item>,
                  <Menu.Item
                    key="3"
                    as={Link}
                    to="/cash-out"
                    onClick={this.closeSidebar}
                  >
                    CASH OUT
                  </Menu.Item>,
                  <Menu.Item
                    key="4"
                    as={Link}
                    to="/dashboard"
                    onClick={this.closeSidebar}
                  >
                    DASHBOARD
                  </Menu.Item>,
                  <Menu.Item
                    key="5"
                    as={Link}
                    to="/"
                    onClick={this.closeSidebar}
                  >
                    LOGOUT
                  </Menu.Item>,
                ]
              }
            </Sidebar>
          }
          <Sidebar.Pusher
            onClick={this.closeSidebar}
            dimmed={mobileSidebarOpen}
          >
            <Navbar
              isMobile={isMobile}
              openSidebar={this.openSidebar}
            />
            { children }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default PageLayout;
