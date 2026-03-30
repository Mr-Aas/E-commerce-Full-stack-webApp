import React from "react";
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom"
import Layout from "./Layout";
import Home from "./Home";
import Contact from "./Contact"
import About from "./About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },

    {
      path: "contact",
      element: <Contact />,
    },

    ]
  }
])

function App() {



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
