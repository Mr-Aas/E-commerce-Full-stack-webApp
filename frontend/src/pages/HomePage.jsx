import React from "react";
import { Storefront } from "../components/storefront";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Storefront />
      <Footer />
    </div>
  );
};

export default HomePage;
