import { useState, useEffect } from "react";

function ImageSlider() {
  const slides = [
    {
      url: "https://res.cloudinary.com/dcfpnfdgy/image/upload/v1774532706/cld-sample-4.jpg",
      title: "Mountain",
    },
    {
      url: "https://res.cloudinary.com/dcfpnfdgy/image/upload/v1774532706/main-sample.png",
      title: "Forest",
    },
    {
      url: "https://res.cloudinary.com/dcfpnfdgy/image/upload/v1774532814/Screenshot_2025-12-14_011710_qwl3km.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-[70vh] ">

      {/* 🔵 Background Gradient */}
      <div className="absolute  "></div>

      {/* 🖼️ Image Container */}
      <div className="relative flex justify-center items-center w-full h-full">

        {/* Image */}
       <img
  src={slides[currentIndex].url}
  alt="slider"
  className="h-full object-contain transition-all duration-700 
  [mask-image:linear-gradient(to_right,transparent,black_10%,black_50%,transparent)]
  [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_100%,transparent)]"
/>

        {/* 🌫️ Left Fade */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-teal-200 to-transparent"></div>

        {/* 🌫️ Right Fade */}
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-violet-200 to-transparent"></div>
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
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentIndex ? "bg-white scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      {/* 📝 Title */}
      <div className="absolute bottom-16 w-full text-center text-white text-xl font-semibold">
        {slides[currentIndex].title}
      </div>
    </div>
  );
}

export default ImageSlider;