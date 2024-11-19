import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './GalleryComponent.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";

import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <MsalProvider instance={msalInstance}>
    <BrowserRouter>
    
        <App />
      
    </BrowserRouter>
  // </MsalProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();