import { useState, useEffect } from "react";
// import slides from "../data/addSlides/data";

function ImageSlider() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setslides] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/products/slides').then(res => res.json())
    ]).then(([slides]) => {
      setslides(slides);
  
    });
  }, []);



  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

 useEffect(() => {
  if (slides.length === 0) return;

  const interval = setInterval(nextSlide, 4000);
  return () => clearInterval(interval);
}, [slides]);

  return (
    <div className="relative w-screen h-[60vh] overflow-hidden">

      {/* 🔵 Background Gradient */}
      <div className="absolute inset-0 "></div>

      {/* 🖼️ Image Container */}
      <div className="relative flex items-center justify-center w-full h-full">

        {/* Image */}
        <img
          src={slides[currentIndex]?.url}
          alt="slider"
          className="
h-full object-contain transition-all duration-700
[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent),linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]
[mask-composite:intersect]"
        />

        {/* 🌫️ Left Fade */}
        <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r "></div>

        {/* 🌫️ Right Fade */}
        <div className="absolute right-0 top-0 h-full w-32  "></div>
      </div>

      {/* ⬅️ Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full hover:bg-black transition"
      >
        {"<"}
      </button>

      {/* ➡️ Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full hover:bg-black transition"
      >
        {">"}
      </button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${index === currentIndex ? "bg-white scale-110" : "bg-gray-300"
              }`}
          ></div>
        ))}
      </div>

      
    </div>
  );
}

export default ImageSlider;
