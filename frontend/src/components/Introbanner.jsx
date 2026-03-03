import { useState } from "react";
import { useEffect } from "react";


const images = [
    "https://picsum.photos/id/1015/1200/500",
    "https://picsum.photos/id/1016/1200/500",
    "https://picsum.photos/id/1018/1200/500",
];

export default function Introbanner() {
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (

        <div className="relative w-full max-w-4xl mx-auto overflow-hidden  shadow-lg">
           

            {/* Slides Container */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="slider"
                        className="w-full flex-shrink-0 object-cover"
                    />
                ))}
            </div>

            {/* Left Button */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
            >
                ❮
            </button>

            {/* Right Button */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black"
            >
                ❯
            </button>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full ${index === i ? "bg-white" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
