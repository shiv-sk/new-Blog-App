import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import HomePage from './pages/Homepage.jsx';
import MyBlogs from './pages/MyBlogs.jsx';
import BlogDetailpage from './pages/BlogDetail.jsx';
import NewBlog from './pages/NewBlog.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:"",
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"myblogs",
        element:<MyBlogs/>
      },
      {
        path:"blogdetail/:blogId",
        element:<BlogDetailpage/>
      },
      {
        path:"newblog",
        element:<NewBlog/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"login",
        element:<Login/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
  </StrictMode>,
)
