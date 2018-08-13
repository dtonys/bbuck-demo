import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import {
  Icon,
  Button,
} from 'semantic-ui-react';
import styles from './CashOut.scss';


class CashOutPage extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div className={styles.cashOut} >
        <div style={{ padding: 20 }} >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} >
            <div> 227.87 </div>
            <div style={{ marginLeft: 5 }} ></div>
            <img
              src="/img/bbuck_icon@2x.png"
              height="12"
              style={{
                position: 'relative',
                bottom: 1,
              }}
            />
          </div>
          <br/>
          <Icon name='resize vertical' size='large' />
          <br/> <br/>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#ED4D50',
            }}
          >
            $27.87
          </div>
          <br /> <br />
          <Button
            className="v2" style={{ minWidth: 200 }} >
            CASH OUT
          </Button>
          <br /><br />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: 'solid white 1px',
          borderBottom: 'solid white 1px',
          padding: 10,
        }} >
          <div style={{
            textAlign: 'left',
            marginRight: 20,
          }} >
            <img src="/img/bank_icon@2x.png" width="20" />
          </div>
          <div style={{
            flex: 1,
            textAlign: 'left',
          }} > Chase &nbsp; | &nbsp; ***5294 </div>
          <div style={{
            flex: 1,
            color: '#ED4D50',
            fontWeight: 700,
            textAlign: 'right',
          }} > Edit </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(CashOutPage);
