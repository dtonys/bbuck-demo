import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import styles from './Buy.scss';


class BuyPage extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div >
        Buy Page
      </div>
    );
  }
}

export default hot(module)(BuyPage);
