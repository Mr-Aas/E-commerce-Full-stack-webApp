import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";

function Itemcard({ data }) {
    const { lang } = useContext(LanguageContext);
    const [index, setIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(6);

    // ✅ Handle responsiveness
    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(2); // mobile
            } else if (window.innerWidth < 1024) {
                setItemsPerView(3); // tablet
            } else {
                setItemsPerView(6); // laptop
            }
        };

        updateItems();
        window.addEventListener("resize", updateItems);
        return () => window.removeEventListener("resize", updateItems);
    }, []);

    // ✅ Next Slide
    const nextSlide = () => {
        if (index < data.length - itemsPerView) {
            setIndex(index + 1);
        }
    };

    // ✅ Previous Slide
    const prevSlide = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    function Button({ arrow, position, onClick }) {
        return (
            <div
                onClick={onClick}
                className={`h-12 w-12 flex cursor-pointer items-center justify-center ${position} bg-black/40 text-white rounded-full hover:bg-black transition`}
            >
                <div className="font-bold text-3xl">{arrow}</div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className='flex w-full justify-center items-center'>
                no such items exist yet
            </div>
        );
    }

    return (
        <div className="cards m-5 relative overflow-hidden">

            {/* LEFT BUTTON */}
            <Button
                arrow="<"
                position="absolute z-10 top-1/2 left-4 -translate-y-1/2"
                onClick={prevSlide}
            />

            {/* SLIDER TRACK */}
            <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${index * (100 / itemsPerView)}%)`
                }}
            >
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="group shrink-0 basis-1/2 sm:basis-1/3 lg:basis-1/6 flex flex-col h-[280px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                    >
                        {/* IMAGE */}
                        <div className="h-[160px] flex items-center justify-center bg-gray-50 overflow-hidden">
                            <img
                                src={product.images?.[0]}
                                alt={`${product.name?.[lang]} photo`}
                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="flex flex-col justify-between flex-1 p-3">
                            <div className="text-sm font-medium text-gray-800 line-clamp-2">
                                {product.name?.[lang]}
                            </div>

                            <div className="text-lg font-semibold text-gray-900 mt-1">
                                ₹{product.price}
                            </div>

                            <div className="text-xs mt-1">
                                {product.isAvailable > 0 ? (
                                    <span className="text-green-600 font-medium">
                                        In stock {product.stock}
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-medium">
                                        Out of stock
                                    </span>
                                )}
                            </div>

                            <button className="mt-2 bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT BUTTON */}
            <Button
                arrow=">"
                position="absolute z-10 top-1/2 right-4 -translate-y-1/2"
                onClick={nextSlide}
            />

        </div>
    );
}

export default Itemcard;