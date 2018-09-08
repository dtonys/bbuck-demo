import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from 'components/Navbar/Navbar';
import Link from 'redux-first-router-link';
import {
  Sidebar,
  Menu,
} from 'semantic-ui-react';


@connect(
  (state) => ({
    routeAction: state.location.type,
  }),
)
class PageLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isMobile: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };
  static defaultProps = {
    user: null,
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

  onLogoutClick = () => {
    this.closeSidebar();
    this.props.logout();
  }

  closeSidebar = () => {
    if ( !this.state.mobileSidebarOpen ) return;
    this.setState({
      mobileSidebarOpen: false,
    });
  }

  render() {
    const { mobileSidebarOpen } = this.state;
    const {
      children,
      isMobile,
      logout,
      user,
    } = this.props;
    const isLoggedIn = Boolean(user);

    let truncatedUsername = null;
    if ( isLoggedIn ) {
      truncatedUsername = (
        user.fortnite_username.length >= 10
          ? user.fortnite_username.slice(0, 7) + '...'
          : user.fortnite_username
      );
    }

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
                  <Menu.Item
                    key="1"
                    onClick={this.closeSidebar}
                  >
                    { truncatedUsername.toUpperCase() }
                  </Menu.Item>,
                  // <Menu.Item
                  //   key="2"
                  //   as={Link}
                  //   to="/buy"
                  //   onClick={this.closeSidebar}
                  // >
                  //   BUY
                  // </Menu.Item>,
                  // <Menu.Item
                  //   key="3"
                  //   as={Link}
                  //   to="/cash-out"
                  //   onClick={this.closeSidebar}
                  // >
                  //   CASH OUT
                  // </Menu.Item>,
                  // <Menu.Item
                  //   key="4"
                  //   as={Link}
                  //   to="/dashboard"
                  //   onClick={this.closeSidebar}
                  // >
                  //   DASHBOARD
                  // </Menu.Item>,
                  <Menu.Item
                    key="5"
                    onClick={this.onLogoutClick}
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
              logout={logout}
              user={user}
            />
            { children }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default PageLayout;
