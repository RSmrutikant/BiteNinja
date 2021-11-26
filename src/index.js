import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@zoomus/websdk/dist/css/react-select.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './Store/Store';
import history from './Utils/HistoryUtil';
import './Assets/fonts/Helvetica.ttf';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
