import React, { Component } from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import styles from 'pages/Dashboard/Dashboard.scss';


const items = [
  {
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+0.96',
  },
  {
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+0.96',
  },
  {
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+0.96',
  },
];

class DashboardPage extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div
        style={{ color: 'white' }}
        className={styles.dashboard}
      >
        <div style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 45,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
          <img
            src="/img/logo.png"
            style={{
              height: 35,
              marginRight: 15,
            }}
          />
          <p> 27.87 </p>
        </div>
        <br />
        <div style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 12,
        }} > USD $5.75 </div>
        <div style={{ marginBottom: 60 }} ></div>
        <div className={ styles.rows } >
          { items.map(({ label, time, gained }) => (
            <div className={ styles.row } >
              <div
                className={ classnames( styles.rowItem, styles.rowItemLabel ) }
              >
                { label }
              </div>
              <div
                className={ classnames( styles.rowItem, styles.rowItemTime ) }
                style={{ textAlign: 'right' }}
              >
                { time }
              </div>
              <div
                className={ classnames( styles.rowItem, styles.rowItemGained ) }
                style={{
                  textAlign: 'right',
                }}
              >
                { gained }
                 <img
                    src="/img/logo.png"
                    style={{
                      height: 12,
                      marginLeft: 7,
                    }}
                  />
              </div>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default hot(module)(DashboardPage);
