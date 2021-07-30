import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

require('dotenv').config()

// For Firebase JS SDK v7.20.0 and later, measurementId is optional */}
var firebaseConfig = {
  apiKey: ,
  authDomain: "crema-cal.firebaseapp.com",
  databaseURL: "https://crema-cal-default-rtdb.firebaseio.com",
  projectId: "crema-cal",
  storageBucket: "crema-cal.appspot.com",
  messagingSenderId: "891749541437",
  appId: "1:891749541437:web:adc128c5b066bebab32c54",
  measurementId: "G-Z2ZJKXJTTP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// export default firebase;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
