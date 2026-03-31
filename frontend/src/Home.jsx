import { useState, useEffect } from 'react'

import Itemcard from './components/Itemcard.jsx'
import ImageSlider from './components/ImageSlider.jsx'



function Home() {
  const [slides, setslides] = useState([]);
  const [Products, setProducts] = useState([])


  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/slides').then(res => res.json()),
      fetch('http://localhost:5000/api/products').then(res => res.json())
    ]).then(([slides, products]) => {
      setslides(slides);
      setProducts(products)
    });
  }, []);


  console.log(Products,slides)

  if (!Products || slides.length === 0 ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="slider">
        <ImageSlider slides={slides} />
      </section>

      <section className="grocery my-3 bg-teal-100  rounded-2xl flex flex-col ">
        <div className="sectionNAME text-3xl font-medium m-3 bg-teal-200 px-10 rounded-full  h-[45px]">
          {Products[0].name}
        </div>
        <div className="datacards overflow-hidden ">
          <Itemcard data={Products} /></div>
      </section>

    </>
  )
}

export default Home
