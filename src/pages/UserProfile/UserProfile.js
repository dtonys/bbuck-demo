import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import styles from './UserProfile.scss';


class UserProfilePage extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div >
       UserProfile Page
      </div>
    );
  }
}

export default hot(module)(UserProfilePage);
