import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import JobPage from './pages/JobPage'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage/>,
      },
      {
        path: '/onboarding',
        element:<ProtectedRoute page={<Onboarding/>}/>,
      },
      {
        path: '/jobs',
        element:<ProtectedRoute page={<JobListing/>}/>,
        
      },
      {
        path: '/jobs/:id',
        element: <ProtectedRoute page={<JobPage/>}/>,
      },
      {
        path: '/post-job',
        element:<ProtectedRoute page={<PostJob/>}/>,
      },
      {
        path: '/saved-jobs',
        element:<ProtectedRoute page={<SavedJobs/>}/>,
      },
      {
        path: '/my-jobs',
        element:<ProtectedRoute page={<MyJobs/>}/>,
      },
    ]
  }

])

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
  </ThemeProvider>
  )
}

export default App
