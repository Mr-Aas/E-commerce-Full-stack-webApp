import React, { useState } from 'react';

function Itemcard({ data }) {

    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        if (index < data.length - 6) {
            setIndex(index + 1);
        }
    };

    const prevSlide = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };
    function Button({ arrow, position, onClick }) {
        return (
            <div
                onClick={onClick}
                className={`h-12 w-12 flex cursor-pointer items-center justify-center bg-red-100 rounded-full ${position}`}
            >
                <div className="font-bold text-3xl">{arrow}</div>
            </div>
        );
    }

    return (
        <div className="cards m-5 relative overflow-hidden">

            {/* LEFT BUTTON */}
            <div className="buttoncontainer" onClick={prevSlide}>
                <Button arrow={"<"} position={"absolute z-10 top-1/2 left-4 -translate-y-1/2"} />
            </div>

            {/* SLIDER TRACK */}
            <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${index * (100 / 6)}%)`
                }}
            >
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="card basis-1/6 shrink-0 flex flex-col h-[240px] rounded bg-white"
                    >
                        <div className="flex items-center justify-center h-[150px] ">
                            <img
                                src="https://m.media-amazon.com/images/I/61jc7ybMbNL.jpg"
                                className="h-full object-contain"
                            />
                        </div>

                        <div className="info flex flex-col p-2">
                            <div className="text-blue-950 text-lg">{product.name}</div>
                            <div className="text-sm">{product.price} rupees</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT BUTTON */}
            <div className="buttoncontainer" onClick={nextSlide}>
                <Button arrow={">"} position={"absolute z-10 top-1/2 right-4 -translate-y-1/2"} />
            </div>

        </div>
    );
}

export default Itemcard;