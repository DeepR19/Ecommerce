import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';

// import {position, transition, Provider as AlertProvider} from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

const root = ReactDOM.createRoot(document.getElementById('root'));

// const options ={
//   timeout: 5000,
//   position: position.BOTTOM_CENTER,
//   transition: transition.Scale
// }

root.render(
  // Redux Provider is used as a store in All subfolder
  <Provider store={store}>  
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
      <App />
    {/* </AlertProvider> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
