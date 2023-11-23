import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const THEME = createTheme({
  typography: {
   "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
   "fontSize": 14
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
