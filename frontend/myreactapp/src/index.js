import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
 // you can also just use 'bottom center'
 position: positions.BOTTOM_CENTER,
 timeout: 5000,
 offset: '30px',
 // you can also just use 'scale'
 transition: transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </AlertProvider>
 </Provider>
);

