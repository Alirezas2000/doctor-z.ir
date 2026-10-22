import React from 'react';import{createRoot}from'react-dom/client';import{BrowserRouter}from'react-router-dom';import App from './App';import './index.css';
const redirect=sessionStorage.getItem('doctorz_redirect');if(redirect){sessionStorage.removeItem('doctorz_redirect');history.replaceState(null,'',import.meta.env.BASE_URL+redirect)}
createRoot(document.getElementById('root')).render(<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/,'')}><App/></BrowserRouter>);
