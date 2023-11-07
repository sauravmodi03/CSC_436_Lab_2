import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { RequestProvider } from 'react-request-hook';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/'
})

root.render(
  <React.StrictMode>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
