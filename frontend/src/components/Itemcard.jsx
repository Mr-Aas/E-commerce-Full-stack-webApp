import React from 'react'



function Itemcard({data}) {
    return (
        <div className="cards m-5 flex flex-wrap gap-4">

            {data.map((product, index) =>

                <div key={product.id}
                    className="card   flex h-[250px] w-[230px] flex-col justify-center rounded bg-red-100 overflow-hidden  relative">
                    <div className="image top-0 w-[220px] overflow-hidden flex bg-red-300 ">
                        <div className="aas">
                            <img src="https://m.media-amazon.com/images/I/61jc7ybMbNL.jpg" alt="image" />
                        </div>

                    </div>
                    <div className="info flex flex-col">
                        <div className="ItemName  font-serif justify-between text-blue-950 text-2xl   px-"> {product.name}</div>
                        <div className="itemDiscription font-serif text-sm  ">{product.price + " rupees"}</div>
                    </div>
                </div>
            )
            }</div >
    )
}

export default Itemcard
