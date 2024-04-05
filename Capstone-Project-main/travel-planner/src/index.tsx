import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import Experience from './Experience/Experience';
import MyTrips, { ViewMyTrips } from './MyTrips/MyTrips';
import CreateExperience from './CreateExperience';
import ShowExperience from './ShowExperience';
import Search from './Search'
import ViewExperience from './Experience/ViewExperience'
import CreateTrip from './MyTrips/CreateTrip'
import AddExperience from './MyTrips/AddExperience'


const router = createBrowserRouter([
  {
    path: "/Experience/:experienceID",
    element: <ViewExperience />
  },
  {
    path: "MyTrips/:tripID/Add",
    element: <AddExperience />
  },
  {
    path: "/MyTrips/Create",
    element: <CreateTrip />
  },
  {
    path: "/showexperience",
    element: <ShowExperience/>
  }
  ,
  {
    path: "/Experience/Experience",
    element: <Experience/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/MyTrips",
    element: <MyTrips />
  },
  {
    path: "/CreateExperience",
    element: <CreateExperience/>
  },
  {
    path: "/MyTrips/:tripID",
    element: <ViewMyTrips />
  },
  {
    path: "/SearchTrips",
    element: <Search/>
  },
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/Capstone-Project",
    element: <LandingPage/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
