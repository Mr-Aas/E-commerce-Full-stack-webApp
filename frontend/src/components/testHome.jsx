import React from "react";

const CategoryCard = ({ title, count, image }) => {
  return (
    <div className="group relative w-72 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg">

      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-5 text-white">
        <h2 className="text-2xl font-bold group-hover:translate-y-[-5px] transition duration-300">
          {title}
        </h2>
        <p className="text-sm opacity-80">{count} Products</p>

        {/* Button */}
        <button className="mt-3 px-4 py-2 bg-white text-black text-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300">
          Explore →
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
