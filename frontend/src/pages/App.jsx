import React from "react";
import {
  RouterProvider
} from "react-router-dom"
import { AuthProvider } from "../context/AuthContext";
import router from "../routes/homepageRoutes";




function App() {



  return (
    <>
      <AuthProvider>
        <RouterProvider
          router={router}
          fallbackElement={<h1>Loading...</h1>} />
      </AuthProvider>
    </>
  )
}

export default App
