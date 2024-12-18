import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Pages/Home.jsx';
import About from './Components/Pages/About.jsx';
import Login from './Components/Pages/Login.jsx';
import Register from './Components/Pages/Register.jsx';
import Love from './Components/Pages/Love.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import ErrorPage from './Components/ErrorPage.jsx';
import AuthoProvider from './Components/AuthoProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },{
        path: "/about",
        element: <About />
      },{
        path: "/love",
        element: <PrivateRoute><Love /></PrivateRoute>
      },{
        path: "/login",
        element: <Login/>
      },{
        path: "/register",
        element: <Register/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthoProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthoProvider>
  </StrictMode>
)