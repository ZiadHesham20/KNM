import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';


const root = ReactDOM.createRoot(document.getElementById('root'));

// 'https://knm.knm-travels.com/public/'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// image oldpath `https://knm.knm-travels.com/storage/app/public/
export const imagesPath = 'http://127.0.0.1:8000/storage/'
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
