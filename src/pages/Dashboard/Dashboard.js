import React, { Component } from 'react';
import classnames from 'classnames';
import { hot } from 'react-hot-loader';
import Link from 'redux-first-router-link';
import styles from 'pages/Dashboard/Dashboard.scss';


const items = [
  {
    logoUrl: '/img/fortnite_logo.png',
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+ 0.96',
  },
  {
    logoUrl: '/img/fortnite_logo.png',
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+ 0.96',
  },
  {
    logoUrl: '/img/fortnite_logo.png',
    label: 'Fortnite Win',
    time: '12:47pm',
    gained: '+ 0.96',
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
            src="/img/bbuck_icon@2x.png"
            style={{
              height: 45,
              marginRight: 15,
            }}
          />
          <p style={{
            fontSize: 50,
            fontWeight: 600,
            letterSpacing: '6px'
          }} > 27.87 </p>
        </div>
        <br />
        <div style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 16,
        }} > USD $5.75 </div>
        <br />
        <div style={{ textAlign: 'center' }} >
          <Link to="/cash-out" style={{
            color: '#ED4D50',
            fontSize: 16,
            fontWeight: 600,
          }} > REDEEM </Link>
        </div>
        <div style={{ marginBottom: 60 }} ></div>
        <div className={ styles.rows } >
          { items.map(({ logoUrl, label, time, gained }, index) => (
            <div className={ styles.row } key={index} >
              <div
                className={ classnames( styles.rowItem, styles.rowItemIcon ) }
              >
                <img
                  src={logoUrl}
                  height="35"
                  style={{
                    position: 'relative',
                    top: 2,
                  }} />
              </div>
              <div
                className={ classnames( styles.rowItem, styles.rowItemTime ) }
              >
                <div style={{
                  fontSize: 12,
                }} > { label } </div>
                <div style={{
                  fontSize: 10,
                  color: '#8A8A8A',
                }} > { time } </div>
              </div>
              <div
                className={ classnames( styles.rowItem, styles.rowItemGained ) }
                style={{
                  textAlign: 'right',
                }}
              >
                <span style={{
                  color: '#ED4D50',
                  fontWeight: 800,
                  fontSize: 16,
                }} > { gained } </span>
                 <img
                    src="/img/bbuck_icon@2x.png"
                    style={{
                      height: 12,
                      marginLeft: 7,
                      marginBottom: 2,
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
