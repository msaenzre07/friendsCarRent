import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from 'axios';

import { BrowserRouter as Router } from 'react-router-dom';

import { UserProvider } from './UserContext'; // Importar el UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

Axios.defaults.baseURL= 'https://git.heroku.com/friendscarrent.git'

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);