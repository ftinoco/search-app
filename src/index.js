import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /* that's why useeffect run twice in fetchHook
   https://stackoverflow.com/a/72370066/10145964 */
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 
