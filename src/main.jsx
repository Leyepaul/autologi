import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/variables.css';
import './styles/base.css';
import './styles/buttons.css';
import './styles/lesson.css';
import './styles/home.css';
import './styles/questions.css';
import './styles/leaderboard.css';
import './styles/account.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
