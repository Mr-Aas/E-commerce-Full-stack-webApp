import React from "react";
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom"
import Layout from "./Layout";
import ItemsPage from "./ItemsPage";
import Contact from "./Contact"
import About from "./About";
import HomePage from "./HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{
      index: true,
      element: <HomePage />,
      loader: async () => {
        return await fetch("http://localhost:5000/products/categories").then((res) => res.json())
      }

    }, {
      path: "contact",
      element: <Contact />,
    }, {
      path: "about",
      element: <About />,
    },
     {
      path: "items/:category",
      element: <ItemsPage />,
      loader: async ({ params }) => {
        return await fetch(`http://localhost:5000/products/items/${params.category}`)
          .then((res) => res.json());
      }
    }

    ]}])

function App() {



  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<h1>Loading...</h1>} />
    </>
  )
}

export default App
