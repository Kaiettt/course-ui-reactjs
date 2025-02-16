import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from "./AuthContext"; // Import the context provider
import EmailVerification from './EmailVerification';
import CourseDetail from './CourseDetail';
import CourseOverview from './CourseOverview';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>
  },
  {
    path: '/login',
    element: <Login></Login>
  }, {

    path: '/signup',
    element: <Signup></Signup>
  }
  , {

    path: '/courses/:id',
    element: <CourseOverview></CourseOverview>
  }

])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
