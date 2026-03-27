import React from 'react'
import data from '../data/data'


function Itemcard() {
    return (
      <>

  {data.map((product, index) => (
    
    <div className=" p-2 border-black rounded-2xl" key={index}>
      
      <div className="h-40 w-full overflow-hidden">
        <img 
          className="h-full w-full object-cover"
          src={product.imageurl}
          alt="image"
        />
      </div>

      <div className="details mt-2">
        <h2>{product.name}</h2>
        <span>{product.price}</span>
      </div>

    </div>

  ))}

</>
    )
}

export default Itemcard
