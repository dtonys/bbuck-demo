// client entry point
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import configureStore from 'redux/configureStore';
import { Provider as ReduxStoreProvider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';


const history = createBrowserHistory();
const store = configureStore({}, history);

if ( process.env.NODE_ENV !== 'production' ) {
  window.store = store;
}

ReactDOM.render(
  (
    <ReduxStoreProvider store={store} >
      <App />
    </ReduxStoreProvider>
  ),
  document.getElementById('appRoot'),
);
