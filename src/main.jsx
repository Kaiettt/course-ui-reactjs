import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import { AuthProvider } from "./AuthContext";
import CourseOverview from './CourseOverview';
import './index.css'
import CourseLesson from './CourseLesson';
import Lesson from './Lesson';
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
  , {

    path: '/lessons/:courseId/:userid',
    element: <CourseLesson></CourseLesson>
  }

])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
