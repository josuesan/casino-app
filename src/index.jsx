import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root'),
);
