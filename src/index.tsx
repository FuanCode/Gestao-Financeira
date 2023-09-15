import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';


const routes = [
  {
    Element: <App />,
    children:[
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/home",
        element: <Home/>
      },
    ]
  }
];
const router = createBrowserRouter(routes);

let rootDom = document.getElementById('root') || document.createElement('div');

const root = ReactDOM.createRoot(rootDom).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);



