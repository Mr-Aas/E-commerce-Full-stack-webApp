import { useState, useEffect } from "react";

function ImageSlider() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Mountain",
    },
    {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Forest",
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
      title: "Path",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ⬅️ Previous
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // ➡️ Next
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  // 🔁 Auto Slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl h-[400px] mx-auto mt-10 overflow-hidden rounded-xl shadow-lg">
      
      {/* Image */}
      <div
        className="w-full h-full bg-center bg-cover transition-all duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        {"<"}
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        {">"}
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;