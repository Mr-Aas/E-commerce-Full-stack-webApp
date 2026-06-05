import React from "react";
import {
  RouterProvider
} from "react-router-dom"
import { AuthProvider } from "../context/AuthContext";
import router from "../routes/homepageRoutes";



function App() {



  return (
    <div className="relative">
      <AuthProvider>
        <RouterProvider
          router={router}
          fallbackElement={<h1>Loading...</h1>} />
        <div className="bills_dot fixed bottom-12 right-1.5">
          <div className="circle h-[70px] w-[70px] rounded-full bg-teal-100 border-2 border-teal-200 flex items-center justify-center">
            <div className="relative">
              <a href="https://bill.smartgrahak.in">
                <img className="h-[40px] " src="../src/assets/icons/calculator_bill.png" alt="calculate bills" />
              </a>
            </div>
          </div>
        </div>
      </AuthProvider>
    </div>
  )
}

export default App
