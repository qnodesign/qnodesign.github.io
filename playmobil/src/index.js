import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route exact path="playmobil/:tab" element={<App />} ö/>
        <Route exact path="playmobil" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
